const http = require("http");
const url = require("url");
const fs = require("fs");
const { parse } = require("querystring");
 const send = require("./m0603.js");
//var send = require("C:/Users/БОСС/AppData/Roaming/npm/node_modules/ppnnh");


http.createServer((req, resp) => {
    if (url.parse(req.url).pathname === "/" && req.method === "GET") {
      resp.end(fs.readFileSync("./06-03.html"));
    } 
    else if (url.parse(req.url).pathname === "/" && req.method === "POST") {
      let body = "";
      let parm = "";
      req.on("data", (data) => {
        body += data.toString();
        parm = parse(body);
        sender = parm.sender;
      });

      resp.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      send("Message :)");
      resp.end("Success");
    }
  }).listen(5000);

console.log('http://localhost:5000/');
