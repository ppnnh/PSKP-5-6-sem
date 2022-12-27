const udp=require('dgram');
const client=udp.createSocket('udp4');
const port=3000;

client.on('message',(msg,info)=>{
    console.log('client: received '+msg.toString());
    console.log('client: info '+msg.length,info.address,info.port);
});
let data=Buffer.from('client: message 01');
client.send(data,port,'localhost',(e)=>{
    if (e) {client.close();}
    else {console.log('client: send');}
});

let data1=Buffer.from('lab');
let data2=Buffer.from('13');
let data3=Buffer.from('udp');

client.send([data1,data2,data3],port,'localhost',(e)=>{
    if(e) {client.close()}
    else {console.log('client: send');}
});