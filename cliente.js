const fs = require('fs');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const messages = require('./chat_pb');
const services = require('./chat_grpc_pb');
const question = require('./question');

const users = new Set();
const messagesHistory = [];

async function main() {
  const ipServer = await question('Digite o IP do Servidor: ');
  const target = ipServer + ":50000";
  const client = new services.SimpleChatClient(target, grpc.credentials.createInsecure());

  const user = await question('Digite seu nome para entrar no chat: ');
  users.add(user);

  const channel = client.chat();

  channel.on('data', function (data) {
    const isOwnMessage = data.getUser() === user;
    if (isOwnMessage) return;

    if (data.getFile() && data.getFile().length > 0) {
      const filename = data.getFilename();
      const filepath = path.join(__dirname, 'downloads', filename);
      fs.mkdirSync(path.dirname(filepath), { recursive: true });
      fs.writeFileSync(filepath, data.getFile());
      console.log(`📥 Arquivo recebido de ${data.getUser()}: ${filename} (salvo em downloads/)`);
    } else {
      console.log(`(${data.getUser()} - ${data.getTimestamp()}): ${data.getText()}`);
      messagesHistory.push(`(${data.getUser()} - ${data.getTimestamp()}): ${data.getText()}`);
    }
  });

  for (;;) {
    const text = await question("Mensagem> ");
    const message = new messages.ChatMessage();

    message.setUser(user);
    message.setTimestamp(new Date().toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }));

    if (text.startsWith('/file ')) {
      const filePath = text.split('/file ')[1].trim();
      try {
        const fileBuffer = fs.readFileSync(filePath);
        const filename = path.basename(filePath);
        message.setFile(fileBuffer);
        message.setFilename(filename);
        message.setText(`[Arquivo enviado: ${filename}]`);

        channel.write(message);
        console.log(`📤 Arquivo enviado: ${filename}`);
      } catch (err) {
        console.error('❌ Erro ao ler o arquivo:', err.message);
      }
    } else if (text.startsWith('/users')) {
      console.log("Usuários online: " + Array.from(users).join(', '));
    } else if (text.startsWith('/clear')) {
      messagesHistory.length = 0;
      console.log("Histórico de mensagens limpo.");
    } else {
      message.setText(text);
      channel.write(message);
      messagesHistory.push(`(USER: ${user}) - ${message.getTimestamp()}): ${text}`);
    }
  }
}

main();
