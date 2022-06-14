import { assert } from 'console';
import http from 'http';
import users from './data/users.json' assert { type: 'json' };
import { v4 as uuidv4 } from 'uuid';
import writeDataFile from './utils.js';

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    try {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    //not working to read only one item
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
    try {
      const userId = req.url.split('/')[3];
      console.log(userId);
      const user = users.find(user => user.id === userId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));

    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } else if (req.url === '/api/users' && req.method === 'POST') {
    //work via postman POST -> Body -> raw -> json
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const { username, age, hobbies } = JSON.parse(body);
        const user = {
          id: uuidv4(),
          username,
          age,
          hobbies,
        };

        users.push(user);
        writeDataFile('./data/users.json', users);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      });
      //hardcoded users.json
      /*const body = {
        id: uuidv4(),
        username: 'Vata',
        age: '564',
        hobbies: ['lol', 'lol', 'lol'],
      };
      
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(body));

      writeDataFile('./data/users.json', users.concat(body)); */
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }

  } else {
    res.writeHead(404, { 'Content-Type': 'text/json' });
    res.end('404 not found');
  }
});

const PORT = process.env.PORT || 7777;
server.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
//uuid.validate(str)