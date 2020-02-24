const server_port = 8082;
let server_address = 'https://blog.xutong.top';

if (process.env.NODE_ENV === "development") {
  server_address = 'http://localhost:' + server_port
}
console.log(process.env.NODE_ENV);

module.exports = {
  server_port,
  dataBase: "mongodb://localhost/blog",
  server_address,
  // dataBase: "mongodb://username:password@localhost:27017/blog",
}
