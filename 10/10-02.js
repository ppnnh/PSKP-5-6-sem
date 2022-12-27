const websocket=require('ws');
let socket=new websocket('ws:/localhost:4000/wsserver');
let k=0;
socket.onopen=()=>{
    console.log('socket.onopen');
    setInterval(() => {
        socket.send(++k);
    }, 3000);
};
socket.onclose=(e)=>console.log(`socket.onclose ${e}`);
socket.onmessage=(e)=>{
    console.log(`${e.data}`);
}
socket.onerror=function(error) {alert('Error'+error.message);};