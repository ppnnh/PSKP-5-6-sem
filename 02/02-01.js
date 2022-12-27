let http=require('http');

let fs=require('fs');

http.createServer(function(req, resp){
    if(req.url=='/html'){
        resp.writeHead(200,{'Content-type' : 'text/html'});
        let text=fs.readFileSync('./index.html');
        resp.end(text);
        
    }
}).listen(5000,'localhost');

console.log('http://localhost:5000/html');