var http=require('http');

let c= (r)=>{
    let rc='';
    for(key in r.headers) rc += '<h3>'+key+':'+r.headers[key]+'</h3>';
    return rc;
}

http.createServer(function (request, response) {
    let b='';
    request.on('data',str=>{b+=str; console.log('data',b);});
    response.writeHead(200, {'Content-Type': 'text/html'});
    request.on('end',()=>
    response.end(
        '<!DOCTYPE html> <html><head></head>'+
        '<body>'+
        '<h1>Structure of request</h1>'+
        '<h2>'+'method: '+request.method+'</h2>'+
        '<h2>'+'version: '+request.httpVersion+'</h2>'+
        '<h2>'+'uri: '+request.uri+'</h2>'+
        '<h2>'+'HEADERS: '+'</h2>'+
        c(request)+
        '<h2>'+'body: '+b+'</h2>'+
        '</body>'+
        '</html>')
    )
}).listen(3000);

console.log('http://localhost:3000/');