var http=require('http');
const readline=require('readline');
var stat='norm';

http.createServer(function (req, resp) {
    resp.writeHead(200, { 'Content-Type': 'text/html' });
    resp.end('<h1>' + stat + '</h1>\n');
}).listen(5000, ()=> console.log('http://localhost:5000/'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'status -> '
});

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
        case 'norm':
            console.log('reg = ' + stat + '-->' + line);
            stat = line;
            break;
        case 'stop':
            console.log('reg = ' + stat + '-->' + line);
            stat = line;
            break;
        case 'test':
            console.log('reg = ' + stat + '-->' + line);
            stat = line;
            break;
        case 'idle':
            console.log('reg = ' + stat + '-->' + line);
            stat = line;
            break;
        case 'exit':
            process.exit(0);
        default:
            console.log(line);
            console.log('reg = ' + stat + '-->' + stat);
            break;
    }
    rl.prompt();
});