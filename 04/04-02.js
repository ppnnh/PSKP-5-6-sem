var http=require('http');
var url=require('url');
var fs=require('fs');
var data=require('./04-01-1');
var db=new data.DB();

db.on('GET', (req, resp)=>{
    console.log('db.get');
    resp.end(JSON.stringify(db.select()));
});

db.on('POST', (req,resp)=>{
    console.log('db.post');
    req.on('data', data=>{
        let x=JSON.parse(data);
        resp.end(JSON.stringify(db.insert(x)));
    });
});

db.on('PUT', (req,resp)=>{
    console.log('db.put');
    req.on('data', data=>{
        let x=JSON.parse(data);
        resp.end(JSON.stringify(db.update(x)));
    });
});

db.on("DELETE", (req,resp)=>{
    console.log('db.delete');
    resp.end(JSON.stringify(db.delete(id)));
})

http.createServer(function(req,resp){
    if (url.parse(req.url).pathname==='/'){
        resp.writeHead(200,{'Content-Type':'text/html'});
        var html=fs.readFileSync('./index.html');
        resp.end(html);
    }
    else if (url.parse(req.url).pathname==='/api/db'){
        id=parseInt(url.parse(req.url,true).query.id);
        db.emit(req.method,req,resp);
    }
}).listen(5000);

console.log('http://localhost:5000/api/db');