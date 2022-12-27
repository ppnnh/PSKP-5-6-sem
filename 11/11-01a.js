const websocket=require('ws');
const fs=require('fs');

const ws=new websocket('ws://localhost:4000');

ws.on('open', ()=>{
    const duplex=websocket.createWebSocketStream(ws);
    let rfile=fs.createReadStream('./MyFile.txt');
    rfile.pipe(duplex);
})