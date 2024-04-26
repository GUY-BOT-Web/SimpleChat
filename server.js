const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('Received: ', message);
    var messageData = JSON.parse(message);
    messageData.username = "anonymous"; // Set username to "anonymous"
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messageData));
      }
    });
  });
});
