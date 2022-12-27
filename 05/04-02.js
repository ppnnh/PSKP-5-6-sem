var http=require('http');
var url=require('url');
var fs=require('fs');
const readline=require('readline');
var data=require('./04-01-1');
var db=new data.DB();

var numberOfCommits=0;
var numberOfLastCommits=0;
var numberOfRequests=0;

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
});

db.on('COMMIT', ()=>{
    console.log('db.commit');
    numComm=num.Comm+db.commit();
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function formatDate(date){
    return date.getHours() +':'+ date.getMinutes() + ':'+date.getSeconds();
}

const isNumeric = n => !isNaN(n);
var timer1=null;
var timer2=null;
var interval1=null;
var isForStatistics=false;
var start;
var finish;
rl.on('line', (line) => {
    line=line.trim();
    var x;
    if((line.split(' ').length-1)==1){
        x = line.substring(line.indexOf(' ')+1,line.length);
        if(!isNumeric(x)){
            line = 'Param error';
        }
        else{
            line = line.substring(0,line.indexOf(' '));
        }
    }
    else if((line.split(' ').length-1)==0){
        x = '';
        console.log('Param is empty');
    }
    else{
        line = 'Param error';
    }
    switch (line.trim()) {
        case 'sd':
            console.log('sd');
            if(x==''){
                clearTimeout(timer1);
                console.log("Server will not be terminated");
            }
            else{
                clearTimeout(timer1);
                console.log(`Server will be stopped in ${x} seconds`);
                timer1 = setTimeout(() => {
                    server.close(()=> {
                            process.exit(0);
                        }
                    );
                }, x * 1000);
            }
            break;
        case 'sc':
            console.log('sc' );
            if(x==''){
                clearInterval(interval1);
                console.log("Interval function stopped");
            }
            else{
                var startInterval = Date.now();
                clearInterval(interval1);
                console.log(`Interval function started`);
                interval1 = setInterval(() => {
                    console.log(`passed = ${Date.now() - startInterval}`);
                    numberOfCommits +=db.commit();
                    if(isForStatistics) {
                        numberOfLastCommits += db.commit();
                    }
                }, x * 1000);
                interval1.unref();
            }
            break;
        case 'ss':
            console.log('ss');
            if(x==''&&timer2!=null){
                clearTimeout(timer2);
                timer2=null;
                console.log("Statistics function stopped");
                console.log(`number of commits:${numberOfLastCommits}`);
                console.log(`number of requests:${numberOfRequests}`);
                numberOfRequests=0;
                numberOfLastCommits=0;
            }
            else {
                numberOfRequests=0;
                numberOfLastCommits=0;
                start = new Date();
                start = formatDate(start);
                finish=0;
                isForStatistics=true;
                timer2 = setTimeout(() => {
                    console.log("Statistics function ended");
                    console.log(`number of commits:${numberOfLastCommits}`);
                    console.log(`number of requests:${numberOfRequests}`);
                    finish=new Date();
                    finish=formatDate(finish);
                    isForStatistics=false;
                }, x * 1000);
            }
            break;
        default:
            console.log(line);
            break;
    }
    rl.prompt();
});

var server=http.createServer(function(req,resp){
    if (url.parse(req.url).pathname==='/'){
        resp.writeHead(200,{'Content-Type':'text/html'});
        var html=fs.readFileSync('./index.html');
        resp.end(html);
    }
    else if (url.parse(req.url).pathname==='/api/db'){
        id=parseInt(url.parse(req.url,true).query.id);
        db.emit(req.method,req,resp);
    }
    else if (url.parse(req.url).pathname==='/api/ss'){
        if(isForStatistics){
            numberOfRequests++;
        }
        resp.writeHead(200, {'Content-Type': 'application/json;'});
        if (typeof url.parse(req.url, true).query.id!='undefined')
        ID=parseInt(url.parse(req.url, true).query.id);
        resp.end(JSON.stringify({commit:numberOfLastCommits,request:numberOfRequests,startTime:start,finishTime:finish}));
    }
}).listen(5000);

console.log('http://localhost:5000/api/db');