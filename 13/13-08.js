let net=require('net');

let host='127.0.0.1';
let port=process.argv[2]?process.argv[2]:40000;

let client=new net.Socket();
let k=0;
let timer=null;
client.connect(port, host,()=>{
    console.log('client connected: '+client.remoteAddress+' '+client.remotePort);
    
    timer=setInterval(()=>{
        client.write(`client ${k++}`);
    },1000);
    setTimeout(()=>{
        clearInterval(timer);
        client.end();
    },20000);
});
client.on('data',(data)=>{
    console.log('client data: ',data);
});
client.on('close',()=>{
    console.log('client close');
});
client.on('error',(e)=>{
    console.log('client error'+e);
});