const jsonServer = require("json-server");

const api = require("./db.json");

const server = jsonServer.create();
const router = jsonServer.router(api);

const middlewares = jsonServer.defaults();
const port = 4040;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.use(
  jsonServer.rewriter({
    "/api/v1/users": "/users",
    "/api/v1/roles": "/roles",
  })
);

server.use(router);

server.listen(port, () => {
  console.log(`Your server is running at ${port}`);
});
