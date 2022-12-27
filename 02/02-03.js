let http=require('http');

http.createServer(function(req,resp){
  
    if(req.url=='/api/name')
    {
        resp.writeHead(200,{'Content-type' : 'text/plain'});
        let text='Buranko Valeria Dmitrievna';
        resp.end(text);
    }
}).listen(5000);

console.log('http://localhost:5000/api/name');