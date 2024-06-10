const http = require('http');

let receivedData = [];

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let requestData = '';

    req.on('data', chunk => {
      requestData += chunk;
    });

    req.on('end', () => {
      console.log('Received data:', requestData);
      receivedData.push(JSON.parse(requestData)); // Store the received data
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
    });
  } else if (req.method === 'GET' && req.url === '/view-data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(receivedData));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
