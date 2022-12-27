let http=require('http');
let url=require('url');
let fs=require('fs');
let qs=require('querystring');
const xmlBuilder=require('xmlbuilder');
const parseString=require('xml2js').parseString;
let mp=require('multiparty');

let http_handler=(req, resp)=>{
    if (req.method=='GET'){
        if (url.parse(req.url,true).pathname==='/'){
            resp.writeHead(200, {'Content-Type':'text/html'});
            resp.write('<h1>Click on the pathname:</h1>');
            resp.write('<a href="http://localhost:5000/connection">/connection</a></br>');
            resp.write('<a href="http://localhost:5000/connection?set=1000">/connection?set=<i>set</i></a></br>');
            resp.write('<a href="http://localhost:5000/headers">/headers</a></br>');
            resp.write('<a href="http://localhost:5000/parameter?x=5&y=3">/parameter?x=<i>x</i>&y=<i>y</i></a></br>');
            resp.write('<a href="http://localhost:5000/parameter/8/3">/parameter/<i>x</i>/<i>y</i></a></br>');
            resp.write('<a href="http://localhost:5000/close">/close</a></br>');
            resp.write('<a href="http://localhost:5000/socket">/socket</a></br>');
            resp.write('<a href="http://localhost:5000/resp-status?code=400&mess=err">/resp-status?code=<i>c</i>&mess=<i>m</i></a></br>');
            resp.write('<a href="http://localhost:5000/formparameter">/formparameter</a></br>');
            resp.write('<a href="http://localhost:5000/files">/files</a></br>');
            resp.write('<a href="http://localhost:5000/files/1.html">/files/<i>filename</i></a></br>');
            resp.end('<a href="http://localhost:5000/upload">/upload</a></br>');
        }
        //1
        if (url.parse(req.url).pathname==='/connection' &&
        typeof url.parse(req.url,true).query.set != undefined){
            var set=parseInt(url.parse(req.url,true).query.set);
            if (Number.isInteger(set)){
                server.keepAliveTimeout=set;
                resp.writeHead(200, {'Content-Type': 'text/plain'});
                resp.end(`server.KeepAliveTimeout: ${server.keepAliveTimeout}`);
            } else {
                resp.writeHead(200, {'Content-Type': 'text/plain'});
                resp.end(`server.KeepAliveTimeout: ${server.keepAliveTimeout}`);
            }
        }

        //2
        if (url.parse(req.url).pathname==='/headers'){
            resp.setHeader('Lera-Header','application/json');
            resp.writeHead(200, {'Content-Type':'text/plain'}, {'Lera-Header':'application/json'});
            resp.write('req.headers: \n');
            for (key in req.headers) resp.write(`${req.headers[key]}\n`);
            resp.end(`\nresp.headers: \n ${resp.headers}`);
        }

        //3
        if (url.parse(req.url).pathname==='/parameter' &&
        typeof url.parse(req.url,true).query != undefined){
            let x=parseInt(url.parse(req.url,true).query.x);
            let y=parseInt(url.parse(req.url,true).query.y);
            if(Number.isInteger(x) && Number.isInteger(y)){
                resp.writeHead(200, {'Content-Type':'text/plain'});
                resp.write(`${x}+${y}=${x+y}\n`);
                resp.write(`${x}-${y}=${x-y}\n`);
                resp.write(`${x}*${y}=${x*y}\n`);
                resp.end(`${x}/${y}=${x/y}`);
            } else {
                resp.writeHead(200, {'Content-Type':'text/plain'});
                resp.end('error');
            }
        } 
        //4
        if (url.parse(req.url,true).pathname.match('/parameter/[A-z0-9]/[A-z0-9]')!=null){
            // console.log(url.parse(req.url,true).pathname.match('/parameter/[A-z0-9]/[A-z0-9]'));
            let x=parseInt(url.parse(req.url,true).pathname.match('/[A-z0-9]/')[0].match('[A-z0-9]')[0]);
            // console.log(x);
            let y=parseInt(url.parse(req.url,true).pathname.match('/[A-z0-9]$')[0].match('[A-z0-9]')[0]);
            // console.log(y);
            if(Number.isInteger(x) && Number.isInteger(y)){
                resp.writeHead(200, {'Content-Type':'text/plain'});
                resp.write(`${x}+${y}=${x+y}\n`);
                resp.write(`${x}-${y}=${x-y}\n`);
                resp.write(`${x}*${y}=${x*y}\n`);
                resp.end(`${x}/${y}=${x/y}`);
            } else {
                resp.writeHead(200, {'Content-Type':'text/plain'});
                // let hostname=req.get('host');
                
                resp.end(`localhost:${req.socket.localPort}${req.url}`);
            }
        }
        //5 
        if (url.parse(req.url).pathname==='/close'){
            resp.writeHead(200,{'Content-Type':'text/plain'});
            resp.end('server close in 10 sec');
            setTimeout(()=>{
                server.close();
                process.exit();
            },10000);   
        }

        //6
        if (url.parse(req.url).pathname==='/socket'){
            resp.writeHead(200, {'Content-Type':'text/plan'});
            resp.write(`socket.localAddress = ${req.socket.localAddress}\n`);
            resp.write(`socket.localPort = ${req.socket.localPort}\n`);
            resp.write(`socket.remoteAddress = ${req.socket.remoteAddress}\n`);
            resp.end(`socket.remotePort = ${req.socket.remotePort}`);
        }

        //7
        if (url.parse(req.url).pathname==='/req-data'){
            resp.writeHead(200, {'Content-Type':'text/plain'});
            let buf='';
            req.on('data', (data)=>{resp.write(`req.on(data) =  ${data.length}\n`); buf+=data;})
            req.on('end',()=>resp.end(`req.on(end) = ${buf.length}`));
        }

        //8
        if (url.parse(req.url).pathname==='/resp-status' &&
        typeof url.parse(req.url,true).query.code != undefined &&
        typeof url.parse(req.url,true).query.mess != undefined){
            let code=url.parse(req.url,true).query.code;
            let mess=url.parse(req.url,true).query.mess;
            resp.statusCode=code;
            resp.statusMessage=mess;
            resp.writeHead(resp.statusCode,resp.statusMessage, {'Content-Type':'text/plain'});
            resp.end(`${resp.statusCode}: ${resp.statusMessage}`);
        }

        //13
        let filename = url.parse(req.url).pathname.split('/')[2];
        if ( url.parse(req.url,true).pathname.match(/^\/files\/[a-z0-9].[a-z]/)){
             console.log(filename);
            try {
                resp.end(fs.readFileSync(`static/${filename}`));
            }
            catch (err) {
                resp.writeHead(404, 'Resource not found', { 'Content-Type':'text/html' });
                resp.end('<h1>Error 404: Resource not found</h1>')
            }
        } 
        //12
        if (url.parse(req.url,true).pathname.match(/^\/files$/)){
          let files = fs.readdirSync('./static');  
          resp.setHeader('X-static-files-count', `${files.length}`);
          resp.writeHead(200,{'Content-Type':'text/plain'});
          resp.end(`count of files: ${files.length}`);
        }
        
        
        //14
        if (url.parse(req.url).pathname==='/upload'){
            resp.writeHead(200,{'Content-Type':'text/html'});
            resp.end('<form method="POST" action="/upload" enctype="multipart/form-data">'+
            '<input name="file" type="file"/>'+
            '<input type="submit"/></form>');
        }

        if (url.parse(req.url).pathname==='/formparameter'){
            resp.writeHead(200, {'Content-Type':'text/html'});
            resp.end(fs.readFileSync('./9.html'));
        }

    }
    else if (req.method == 'POST'){
        //9
        if (url.parse(req.url).pathname==='/formparameter'){
            let result='';
            req.on('data', data=>{result+=data;});
            req.on('end', ()=>{
                result+='</br>';
                let o=qs.parse(result);
                for (let key in o) {result+= `${key} = ${o[key]}</br>`};
                resp.writeHead(200, {'Content-Type':'text/html'});
                resp.write('<h1>URL-parameteres</h1>');
                resp.end(`${result}`);
            })
        }
        //10
        if (url.parse(req.url).pathname==='/json'){
            let result='';
            req.on('data', (data)=>result+=data);
            req.on('end',()=>{
                let data=JSON.parse(result);
                let obj={};
                obj["__comment"]="Response. Lab08";
                obj["x_plus_y"]=+data.x+ +data.y;
                obj["Concatanition_s_o"]=`${data.s}: ${data.o.surname}, ${data.o.name}`;
                obj["Length_m"]=data.m.length;
                resp.writeHead(200, {'Content-Type':'application/json'});
                resp.end(JSON.stringify(obj));
            })
        }
        //11
        if (url.parse(req.url).pathname==='/xml'){
            let string='';
            req.on('data', (data)=>string+=data.toString());
            req.on('end',()=>{
                parseString(string, (err, result)=>{
                    let sum=0;
                    let mess='';
                    result.request.x.forEach(element => {
                        sum+=Number.parseInt(element.$.value);
                    });
                    result.request.m.forEach((element)=>{
                        mess+=element.$.value;
                    });
                    let doc=xmlBuilder
                        .create('response')
                        .att('id',Math.round(Math.random()*!00))
                        .att('request',result.request.$.id);
                    doc.ele('sum',{element:'x', sum:`${sum}`});
                    doc.ele('concat',{element:'m', result: `${mess}`});
                    resp.writeHead(200, {'Content-Type':'text/xml'});
                    resp.end(doc.toString({pretty: true}));
                 });
            });
        }
        //14
        if (url.parse(req.url).pathname==='/upload'){
            let form=new mp.Form({uploadDir:"./static"});
            form.on("file",(name, file)=>{
                console.log(`${name}=${file.originalFilename}: ${file.path}`);
            });
            form.on("error", (err) => {
                resp.writeHead(200, { "Content-type": "text/plain;charset=utf8;" });
                resp.end("Error");
              });
              form.on("close", () => {
                resp.writeHead(200, { "Content-type": "text/plain;charset=utf8;" });
                resp.end("Success");
              });
              form.parse(req);
        }
    }
};

let server=http.createServer(http_handler);

server.listen(5000, (v)=>{console.log('http://localhost:5000')})
        .on('error', (e)=>{console.log('error', e.code)})

