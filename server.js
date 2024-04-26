const http = require('http');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the content type to text/event-stream for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
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
});

// Listen on port 8080
server.listen(8080, () => {
  console.log('SSE server running on port 8080');
});
