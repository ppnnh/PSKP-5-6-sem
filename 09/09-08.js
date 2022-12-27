// 24. Разработайте приложение (клиент) 09-08,
//  предназначенное для отправки GET-запроса 
//  и получения ответа с вложенным файлом.
// 25. Для проверки разработайте соответствующий сервер

let http=require('http');
let fs=require('fs');

const filename='2.txt';
const file=fs.createWriteStream(filename);

let options={
    host:'localhost',
    path:`/8/1.txt`,
    port:5000,
    method:'GET'
}
const req=http.request(options,(resp)=>{
    console.log('resp.statusCode= ',resp.statusCode);
    if (resp.statusCode != 404) {
        resp.pipe(file);
        resp.on('end', () => { console.log(`Downloaded file:  ${filename}\n`); });
    }
});
req.on('error',(e)=>console.log(e.message));
req.end();