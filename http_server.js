const http = require('http');
const d = new Date();

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

  let requestData = '';

  req.on('data', chunk => {
    requestData += chunk;
  });

  req.on('end', () => {
    console.log('Received data:', requestData);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log(`Catch Data--`);
    res.end('ok');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
