const grpc = require('@grpc/grpc-js');
const services = require('./chat_grpc_pb');
const os = require('os');
const users = [];

function chat(call) {
  users.push(call);
  call.on('data', function (data) {
    if (data.getFile() && data.getFile().length > 0) {
      console.log(`📦 Arquivo recebido de ${data.getUser()}: ${data.getFilename()}`);
    } else {
      console.log(`(${data.getUser()} - ${data.getTimestamp()}): ${data.getText()}`);
    }
    users.forEach(user => user.write(data));
  });
}

function main() {
  const networkInterfaces = os.networkInterfaces();
  const server = new grpc.Server();
  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const addressInfo of addresses) {
      if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
        console.log(`IP Address: ${addressInfo.address}`);
      }
    }
  }
  server.addService(services.SimpleChatService, { chat: chat });
  server.bindAsync('0.0.0.0:50000', grpc.ServerCredentials.createInsecure(), () => {
    console.log("Servidor On!");
    server.start();
  });
}

main();
