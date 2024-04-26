const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/send-message' && req.method === 'POST') {
    // Handle incoming message
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Convert buffer to string
    });
    req.on('end', () => {
      const messageData = parse(body); // Parse message data
      const message = JSON.stringify({ message: messageData.message });
      // Broadcast message to all clients
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      });
      res.end('Message received');
      broadcast(message);
    });
  } else {
    // Set the content type to text/event-stream for SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    // Send a comment to keep the connection alive
    res.write(': keep-alive\n\n');

    // Function to send messages at regular intervals
    const sendMessage = () => {
      const message = JSON.stringify({ time: new Date().toLocaleTimeString() });
      res.write(`data: ${message}\n\n`);
    };

    // Send messages every second
    const intervalId = setInterval(sendMessage, 1000);

    // When the client closes the connection, clear the interval
    req.on('close', () => {
      clearInterval(intervalId);
    });
  }
});

// Function to broadcast messages to all connected clients
const broadcast = (message) => {
  server.connections.forEach((connection) => {
    connection.write(message);
  });
};

// Listen on port 8080
server.listen(8080, () => {
  console.log('SSE server running on port 8080');
});
