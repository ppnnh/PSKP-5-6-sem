const http=require('http');
const url=require('url');
const fs=require('fs');
const {parse}=require('querystring');

http.createServer(function(req,resp){
    if (url.parse(req.url).pathname==='/' && req.method=='GET'){
        let html=fs.readFileSync('./06-02.html');
        resp.writeHead(200,{'Content-Type':'text/html'});
        resp.end(html);
    }
    else if (url.parse(req.url).pathname==='/' && req.method=='POST'){
        console.log('POST');
        let body='';
        resp.writeHead(200, {'Content-type':'text/html'});
        req.on("data",(data)=> {
            body+=data.toString();
        });
        req.on("end",()=>{
            let parm=JSON.parse(body);
            resp.end('Status: OK.\n'+ "Sender: " +  parm.sender + "\nMessage: " + parm.message+ "\nReceiver: " +parm.receiver);
        })
    }
}).listen(5000);

console.log('http://localhost:5000/');