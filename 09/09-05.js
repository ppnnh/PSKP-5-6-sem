// 15. Разработайте приложение (клиент) 09-05, 
// предназначенное для отправки POST-запроса 
// с данными в xml-формате и обработки ответа в xml-формате. 
// 16. Используйте структуры данных в запросах 
// и ответах из задания 11 лабораторной работы 8.
// 17. Для проверки разработайте соответствующий сервер.

const http = require('http');
const xmlBuilder = require('xmlbuilder');
const parseString = require('xml2js').parseString;


const doc = xmlBuilder.create('request').att('id', 300)
doc.ele('x').att('value', 6);
doc.ele('x').att('value', 4);
doc.ele('x').att('value', 7);
doc.ele('m').att('value', 'l');
doc.ele('m').att('value', 'e');
doc.ele('m').att('value', 'r');
doc.ele('m').att('value', 'a');


let options={
    host:'localhost',
    path:`/5`,
    port:5000,
    method:'POST',
    headers:{'Content-Type':'text/xml'}
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
req.end(doc.toString({pretty: true}));