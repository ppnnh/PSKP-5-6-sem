//TCP-client
//1 sec  32-bit number
//20 sec close
let net=require('net');

let host='127.0.0.1';
let port=40000;

let client=new net.Socket();
let buf=new Buffer.alloc(4);
let timerid=null;
client.connect(port, host,()=>{
    console.log('client connected: '+client.remoteAddress+' '+client.remotePort);
    let k=0;
    timerid=setInterval(()=>{
        buf.writeInt32LE(k++,0);
        client.write(buf);
    }, 1000);
    setInterval(() => {
        clearInterval(timerid);
        client.end();
    }, (20000));
});
client.on('data',(data)=>{
    console.log('client data: '+data.readInt32LE());
    client.destroy();
});
client.on('close',()=>{
    console.log('client close');
});
client.on('error',(e)=>{
    console.log('client error'+e);
});