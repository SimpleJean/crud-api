import { assert } from 'console';
import http from 'http';
import users from './data/user.json' assert {type: 'json'};

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/json' });
    res.end('404 not found');
  }
});

const PORT = process.env.PORT || 7777;
server.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
