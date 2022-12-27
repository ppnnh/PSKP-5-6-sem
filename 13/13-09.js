const udp=require('dgram');
const port=3000;

let server=udp.createSocket('udp4');

server.on('error',(e)=>{
    console.log('error: '+e);
    server.close();
});
server.on('message',(msg,info)=>{
    console.log('server: reseived message '+msg.toString());
    console.log('server: info ',msg.length,info.address,info.port);
    server.send(`echo ${msg}`,info.port,info.address,(e)=>{
        if(e){server.close()}
        else {console.log('server: send');}
    });
});
server.on('listening',()=>{
    console.log('server: port '+server.address().port);
    console.log('server: ip '+server.address().address);
    console.log('server: family '+server.address().family);
});
server.on('close',()=>{
    console.log('server: socket close');
});
server.bind(port);