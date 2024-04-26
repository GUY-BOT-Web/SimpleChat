const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  
  ws.on('message', function incoming(message) {
    console.log('Received: ', message);
    const receivedData = JSON.parse(message);
    const username = receivedData.username || "anonymous"; // Default username is "anonymous"
    const formattedMessage = {
      username: username,
      message: receivedData.message
    };
    // Broadcast the message to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(formattedMessage));
      }
    });
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});
