const websocket=require('ws');
const fs=require('fs');

const wsserver=new websocket.Server({port: 4000, host: 'localhost'});

wsserver.on('connection', (ws)=>{
    const duplex=websocket.createWebSocketStream(ws);
    let wfile=fs.createWriteStream(`./upload/file.txt`);
    duplex.pipe(wfile);
});
