// 18. Создайте файл MyFile.txt. Добавьте в файл текст. 
// 19. Разработайте приложение (клиент) 09-06,
//  предназначенное для отправки POST-запроса
//   с вложенным файлом MyFile.txt (multipart/form-data).
// 20. Для проверки разработайте соответствующий сервер.
const http = require('http');
const fs = require('fs');

let bound = 'qweqweqwe';
let body = `--${bound}\r\n`;
body += 'Content-Disposition: form-data; name="txtUpload"; filename="MyFile.txt"\r\n';
body += 'Content-Type: text/plain\r\n\r\n';
body += fs.readFileSync('./MyFile.txt');
body += `\r\n--${bound}--`;


let options = {
    host:'localhost',
    path:'/6',
    port:5000,
    method:'POST',
    headers:{'Content-Type': `multipart/form-data; boundary=${bound}`}
}

const req = http.request(options, (resp) => {
    console.log('resp.statusCode= ',resp.statusCode);
    let data = '';
    resp.on('data',(chunk)=>{
        console.log('data= ',data+=chunk.toString());
    });
    resp.on('end',()=>console.log('end: ', data));
});

req.on('error', e =>  console.log(e.message));
req.end(body);