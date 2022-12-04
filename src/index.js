const http = require('http');
const {URL} = require('url');

const routes = require('./routes');

const server = http.createServer((request, response)=>{
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);
  console.log(splitEndpoint);

  if(splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ))

  if(route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(body));
    }

    route.handler(request, response);
  } else {
    response.writeHead(404,{'Content-type':'text/html'});
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
})

server.listen(3000, () => console.log('Server started at http://localhost:3000'));