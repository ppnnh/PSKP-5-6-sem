const net=require('net');

let host='0.0.0.0';
let port1=40000;
let port2=50000;

let h=(n)=>{return (sock)=>{
    console.log('server connected: '+sock.remoteAddress+': '+sock.remotePort);
    sock.on('data',(data)=>{
        console.log(`server data${n}: `, sock.remoteAddress+': '+data.toString());
        sock.write(`echo${n}: `+ data);
    });
    sock.on('close',()=>{
        console.log(`server closed${n}: `,sock.remoteAddress+''+sock.remotePort);
    });

}}

net.createServer(h(port1)).listen(port1,host).on('listening',()=>{
    console.log(`TCP-server ${host}:${port1}`);
})

net.createServer(h(port2)).listen(port2,host).on('listening',()=>{
    console.log(`TCP-server ${host}:${port2}`);
})