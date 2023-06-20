let app = require('express')();
let https = require('https');
let fs = require('fs');


let options = {
    key: fs.readFileSync('RS.key').toString(),
    cert: fs.readFileSync('RS.crt').toString()
};

https.createServer(options, app)
.listen(3000, ()=>{console.log('https://bvd:3000')});


app.get('/', (req, res, next)=>{
    res.end('LAB26 BVD');
})