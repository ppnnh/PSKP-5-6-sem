let http=require('http');
let url=require('url');
const xmlBuilder=require('xmlbuilder');
const parseString=require('xml2js').parseString;
let mp=require('multiparty');
let fs=require('fs');


let http_handler=(req, resp)=>{
    if (url.parse(req.url,true).pathname=='/1' && req.method=='GET'){
        resp.writeHead(200,{'Content-Type':'text/plain'});
        resp.end('server 09-01');
    }

    if (url.parse(req.url,true).pathname=='/2' && req.method=='GET'){
        let query=url.parse(req.url,true).query;
        let params='';
        resp.writeHead(200,{'Content-Type':'text/plain'});
        resp.write('GET-params\n');
        for (key in query){
            params+=`${key} = ${query[key]}\n`;
        }
        resp.end(`${params}`);
    }

    if (url.parse(req.url,true).pathname=='/3' && req.method=='POST'){
        let query=url.parse(req.url,true).query;
        let params='';
        resp.write('POST-params\n');
        for (key in query){
            params+=`${key} = ${query[key]}\n`;
        }
        resp.end(`${params}`);
    }

    if (url.parse(req.url).pathname==='/4' && req.method=='POST'){
        let result='';
        req.on('data', (data)=>result+=data);
        req.on('end',()=>{
            let data=JSON.parse(result);
            let obj={};
            obj["__comment"]="Response. Lab09";
            obj["x_plus_y"]=+data.x+ +data.y;
            obj["Concatanition_s_o"]=`${data.s}: ${data.o.surname}, ${data.o.name}`;
            obj["Length_m"]=data.m.length;
            resp.writeHead(200, {'Content-Type':'application/json'});
            resp.end(JSON.stringify(obj));
        })
    }

    if (url.parse(req.url,true).pathname=='/5' && req.method=='POST'){
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

    if (url.parse(req.url,true).pathname=='/6' || url.parse(req.url,true).pathname=='/7' && req.method=='POST'){
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



   
        
    let regexFile = new RegExp(`^\/8\/[a-zA-Z0-9]+\.[a-zA-Z]+$`);

    if (regexFile.test(url.parse(req.url).pathname) && req.method=='GET'){
        let filename = url.parse(req.url).pathname.split('/')[2];
        console.log(`static/${filename}`);
        try {
            resp.end(fs.readFileSync(`static/${filename}`));
            console.log('success');
        }
        catch (err) {
            resp.writeHead(404, 'Resource not found', { 'Content-Type':'text/html' });
            resp.end('<h1>Error 404: Resource not found</h1>');
            console.log(err);
        }
    }
    
}

let server=http.createServer(http_handler);
server.listen(5000, (v)=>{console.log('http://localhost:5000')})
        .on('error', (e)=>{console.log('error', e.code)})