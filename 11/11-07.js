// 30. Разработайте приложение 11-07,
//  представляющее собой WebSocket(WS)-север,
//   прослушивающий порт 4000.
// 31. Приложение может принимать три типа
//  уведомлений: A, B, C. При получении уведомления, 
//  сервер выводит соответствующее сообщение на консоль.
// 32. Разработайте приложение 11-07a, представляющее
//  собой WS-клиент, демонстрирующий работоспособность 
//  сервера. Приложение шлет уведомления серверу при
//   получении соответствующего сообщения через стандартный
//    ввод (консоль).
const rpcws=require('rpc-websockets').Server

let server=new rpcws({port: 4000, host: 'localhost'});

server.register('A', ()=>{
    console.log('notify A')
}).public();
server.register('B', ()=>{
    console.log('notify B')
}).public();
server.register('C', ()=>{
    console.log('notify C')
}).public();