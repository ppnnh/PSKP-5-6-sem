const websocket=require('ws');
const fs=require('fs');

const wsserver=new websocket.Server({port: 4000, host: 'localhost'});

let k=0;
wsserver.on('connection', (ws)=>{
    ws.on('pong', (data)=>{
        console.log('on pong: ',data.toString());
    });
    ws.on('message', (data)=>{
        console.log(`on message: ${data.toString()}`);
        ws.send(data);
    });
    setInterval(()=>{
        wsserver.clients.forEach((client)=>{
            if (client.readyState == ws.OPEN){
                client.send(`11-03-server: ${++k}`);
            }
        })
    }, 15000);
    setInterval(() => {
        console.log(`count of connections: ${wsserver.clients.size}`);
        ws.ping(`server ping ${wsserver.clients.size} clients`);
    }, 5000);
});
