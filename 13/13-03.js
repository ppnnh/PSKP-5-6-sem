//TCP-server
//32-bit numbers
//sum in 5 sec
const net=require('net');

let host='0.0.0.0';
let port=40000;

let sum=0;
let server=net.createServer();
server.on('connection',(sock)=>{
    console.log('server connected: '+sock.remoteAddress+': '+sock.remotePort);
    sock.on('data',(data)=>{
        console.log('server data: ', data.readInt32LE()+': '+sum);
        sum+=data.readInt32LE();
    });
    let buf=Buffer.alloc(4);
    setInterval(() => {
        buf.writeInt32LE(sum,0);
        sock.write(buf);
    }, (5000));
    sock.on('close',()=>{
        console.log('server closed: ',sock.remoteAddress+' '+sock.remotePort);
    });
    sock.on('error',(e)=>{
        console.log('server error: ',sock.remoteAddress+' '+sock.remotePort);
    })

});
server.on('listening',()=>{
    console.log('TCP-server ',host+': '+port);
})
server.on('error',(e)=>{
    console.log('TCP-server error ',e);
})
server.listen(port,host);