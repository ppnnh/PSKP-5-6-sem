const websocket=require('ws');
const fs=require('fs');

const wsserver=new websocket.Server({port: 4000, host: 'localhost'});
let parm2=process.argv[2];
wsserver.on('connection', (ws)=>{
    const duplex=websocket.createWebSocketStream(ws);
    let rfile=fs.createReadStream(`./download/${parm2}`);
    rfile.pipe(duplex);
});
