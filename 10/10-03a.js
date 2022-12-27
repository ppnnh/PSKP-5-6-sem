const websocket=require('ws');
let socket=new websocket('ws:/localhost:4000/wsserver');

let parm0=process.argv[0];
let parm1=process.argv[1];
let parm2=process.argv[2];

console.log(`parm2 = ${parm2}`);

let prfx=typeof parm2=='undefined'?'A':parm2;

let k=0;

socket.onopen=()=>{
    console.log('socket.onopen');
    setInterval(() => {
        socket.send(`client: ${prfx}-${++k}`);
    }, 3000);
};
socket.onclose=(e)=>console.log(`socket.onclose ${e}`);
socket.onmessage=(e)=>{
    console.log(`${e.data}`);
}
socket.onerror=function(error) {alert('Error'+error.message);};