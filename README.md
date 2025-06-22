# chat-grpc

Um aplicativo de chat em tempo real que usa gRPC para comunicação.

## Descrição

Este projeto é um aplicativo de chat de console que permite que vários clientes se conectem a um servidor central e troquem mensagens em tempo real. Ele demonstra o uso de gRPC para comunicação de streaming bidirecional entre um cliente e um servidor Node.js.

## Funcionalidades

* **Bate-papo em tempo real**: As mensagens são transmitidas instantaneamente para todos os clientes conectados.
* **Lista de usuários**: Digite `/users` para ver uma lista de todos os usuários atualmente online.
* **Limpar histórico**: Digite `/clear` para limpar o histórico de mensagens do seu console.
* **Enviar arquivo**: Digite `/file caminho/para/arquivo.png` para enviar arquivos.
* **Carimbo de data/hora**: Cada mensagem é carimbada com a hora em que foi enviada.

## Tecnologias utilizadas

* **Node.js**: O ambiente de tempo de execução para o cliente e o servidor.
* **gRPC**: A estrutura de chamada de procedimento remoto usada para comunicação.
* **Protocol Buffers**: O mecanismo de serialização de dados estruturados usado pelo gRPC.

## Instalação

1.  Clone este repositório:
    ```bash
    git clone https://github.com/Lisfe00/chat-grpc/tree/main
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd chat-grpc
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

## Como usar

### Executando o servidor

1.  Abra um terminal e execute o seguinte comando para iniciar o servidor:
    ```bash
    npm run start-server
    ```
2.  O servidor começará a escutar na porta 50000 e exibirá o endereço IP no qual está sendo executado.

### Executando o cliente

1.  Abra um novo terminal e execute o seguinte comando para iniciar o cliente:
    ```bash
    npm run start-client
    ```
2.  Você será solicitado a inserir o endereço IP do servidor. Digite o endereço IP exibido no console do servidor.
3.  Você será solicitado a inserir seu nome de usuário. Este nome será exibido para outros usuários no chat.
4.  Depois de conectado, você pode começar a enviar mensagens. As mensagens de outros usuários aparecerão em seu console.

## Arquivos do Projeto

* `chat.proto`: Define a estrutura da mensagem do gRPC e o serviço de chat.
* `servidor.js`: O código do servidor gRPC que gerencia o chat.
* `cliente.js`: O código do cliente gRPC que se conecta ao servidor para enviar e receber mensagens.
* `package.json`: Contém os metadados do projeto e as dependências.
