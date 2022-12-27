let k=0;
let message;
const websocket=require('ws');
const wsserver=new websocket.Server({port:4000,host:'localhost',path:'/wsserver'})
wsserver.on('connection',(ws)=>{
    ws.on('message',recvmessage=>{
        console.log(`${k+1} received message: ${recvmessage}`);
        message=recvmessage;
    });
    setInterval(() => {
        ws.send(`10-02-server: ${message}->${++k}`)
    }, (5000));
    setInterval(()=>{
        ws.close()
    }, (25000));
});

console.log(`ws server:\nhost: ${wsserver.options.host}, port: ${wsserver.options.port}, path: ${wsserver.options.path}`);
