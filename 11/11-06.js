
// 24. Приложение может генерировать три события: A, B, C.

const rpcws=require('rpc-websockets').Server

let server=new rpcws({port: 4000, host: 'localhost'});

server.event('A');
server.event('B');
server.event('C');

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let data = null;
    while ((data = process.stdin.read()) != null) {
        switch (data.trim().toUpperCase()) {
            case 'A': 
            server.emit('A', 'event A');
            break;
        case 'B': 
            server.emit('B', 'event B'); 
            break;
        case 'C': 
            server.emit('C', 'event C'); 
            break;
        }
    }
});