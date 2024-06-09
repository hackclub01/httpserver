const http = require('http');

const server = http.createServer((req, res) => {
  let requestData = '';

  req.on('data', chunk => {
    requestData += chunk;
  });

  req.on('end', () => {
    console.log('Received data:', requestData);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Data received successfully');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
