let redis=require('redis');
let client=redis.createClient();

client.on('connect', ()=>{
    console.log('Connected!');
});

client.on('error', (e)=>{
    console.log(e);
});

client.connect()
    .then(()=>{
        client.quit();
    })
    .catch((err=>console.log(err)))
