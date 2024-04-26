const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const receivedData = JSON.parse(message);
    const username = receivedData.username || "anonymous"; // Default username is "anonymous"
    const formattedMessage = {
      username: username,
      message: receivedData.message
    };
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(formattedMessage));
      }
    });
  });
});
