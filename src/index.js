const http = require('http');

const users = require('./mocks/users');

const server = http.createServer((request, response)=>{
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  if(request.url === '/users' && request.method === 'GET'){
    response.writeHead(200,{'Content-type':'application/json'});
    response.end(JSON.stringify(users));
  }

  // response.writeHead(200,{'Content-type':'text/html'});
  // response.end('<h1>Hello world!</h1>');
})

server.listen(3000, () => console.log('Server started at http://localhost:3000'));