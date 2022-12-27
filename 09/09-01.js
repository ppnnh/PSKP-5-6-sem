// 1. Разработайте приложение (клиент) 09-01, 
// предназначенное для отправки GET-запроса.
// 2. Выведите на консоль: статус ответа,
//  сообщение к статусу ответа, IP-адрес удаленного сервера, 
//  порт удаленного сервера, данные пересылаемые в теле ответа. 
// 3. Для проверки разработайте соответствующий сервер.
let http=require('http');

let options={
    host:'localhost',
    path:'/1',
    port:5000,
    method:'GET'
}
const req=http.request(options,(resp)=>{
    console.log('req.statusCode= ',resp.statusCode);
    console.log('req.statusMessage= ',resp.statusMessage);
    console.log('socket.remoteAddress= ',resp.socket.remoteAddress);
    console.log('socket.remotePort= ',resp.socket.remotePort);

    let data='';
    resp.on('data',(chunk)=>{
        data+=chunk.toString('utf-8');
    })
    resp.on('end',()=>console.log('data= ',data));
});

req.on('error',(e)=>{console.log(e.message);});
req.end();
