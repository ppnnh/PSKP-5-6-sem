// 10. Разработайте приложение (клиент) 09-04, 
// предназначенное для отправки POST-запроса
//  с данными в json-формате и обработки ответа в json-формате. 
// 11. Используйте структуры данных в запросах и 
// ответах из задания 10 лабораторной работы 8.
// 12. Для проверки разработайте соответствующий сервер.
// 13. Выведите на консоль: статус ответа, данные 
// пересылаемые в теле ответа.
// 14. Для проверки разработайте соответствующий сервер.
let http=require('http');

const json=JSON.stringify({
    "__comment": "Request. Lab09",
    "x": 1,
    "y": 2,
    "s": "Message",
    "m":["L","e","r","a"],
    "o":{"surname":"Buranko", "name": "Valeria"}
});

let options={
    host:'localhost',
    path:`/4`,
    port:5000,
    method:'POST',
    headers:{'Content-Type':'application/json'}
}
const req=http.request(options,(resp)=>{
    console.log('resp.statusCode= ',resp.statusCode);
    let data='';
    resp.on('data',(chunk)=>{
        console.log('data= ',data+=chunk.toString());
    });
    resp.on('end',()=>console.log('end: ', data));
});
req.on('error',(e)=>console.log(e.message));
req.end(json);