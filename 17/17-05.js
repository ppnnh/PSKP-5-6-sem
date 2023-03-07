let redis=require("redis");

let client=redis.createClient();

(async()=>{
    await client.connect();
    let timeout=setInterval(async() => {
        await client.publish('channel','hello');
    }, 1000);

    let sub=client.duplicate();
    await sub.connect();
    await sub.subscribe('channel',(msg)=>{
        console.log(`channel sent message: ${msg}`);
    });

    setTimeout(
        async()=>{
            await sub.unsubscribe();
            await sub.quit();
    }, 5000);
    setTimeout(
        async()=>{
            clearInterval(timeout);
            await client.quit();
    }, 6000);
    
})()    