let http=require('http');
let stat=require('./m07-01')('./static');


let http_handler=(req, res)=>{
    if(req.method=='GET'){
        if (stat.isStatic('html', req.url)) stat.sendFile(req, res, {'Content-Type':'text/html'});
        else if (stat.isStatic('css', req.url)) stat.sendFile(req, res, {'Content-Type': 'text/css'});
        else if (stat.isStatic('js', req.url)) stat.sendFile(req, res, {'Content-Type': 'text/javascript'});
        else if (stat.isStatic('png', req.url)) stat.sendFile(req, res, {'Content-Type': 'image/png'});
        else if (stat.isStatic('docx', req.url)) stat.sendFile(req, res, {'Content-Type': 'application/msword'});
        else if (stat.isStatic('json', req.url)) stat.sendFile(req, res, {'Content-Type': 'application/json'});
        else if (stat.isStatic('xml', req.url)) stat.sendFile(req, res, {'Content-Type': 'application/xml'});
        else if (stat.isStatic('mp4', req.url)) stat.sendFile(req, res, {'Content-Type': 'video/mp4'});
        else stat.writeHTTP404(res);
    }
    else {
        res.statusCode=405;
        res.statusMessage='Invalid method';
        res.end=("ERR405: Invalid method");
    }
}
let server=http.createServer();

server.listen(5000, (v)=>{console.log('http://localhost:5000')})
    .on('error', (err)=>{console.log('server.listen(5000): error', err.code)})
    .on('request', http_handler);