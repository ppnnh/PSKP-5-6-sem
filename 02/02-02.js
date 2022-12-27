let http=require('http');
let fs=require('fs');

http.createServer(function(req, resp){
    const fname='./pic.png';
    let jpg=null;
    
    if(req.url=='/png'){
        fs.stat(fname, (err,stat)=>{
            if(err){console.log('error',err);}
            else{
                jpg=fs.readFileSync(fname);
                resp.writeHead(200,{'Content-Type': 'image/jpeg', 'Content-Length':stat.size});
                resp.end(jpg,'binary');
            }
        });
    }
}).listen(5000)

console.log('http://localhost:5000/png');