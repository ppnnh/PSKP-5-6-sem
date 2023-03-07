let redis=require("redis");

let client=redis.createClient();

(async()=>{
    await client.connect();
    await client.set('incr',0);
    async function funcIncr(){
        for (let n=1; n<=10000; n++){
            await client.incr('incr');
        };
    };

    async function funcDecr(){
        for (let n=1; n<=10000; n++){
            await client.decr('incr');
        };
    };

    let startTime=Date.now();
    await funcIncr();
    let endTimeIncr=Date.now();
    console.log(`incr: ${endTimeIncr-startTime}`);

    await funcDecr();
    let endTimeDecr=Date.now();
    console.log(`decr: ${endTimeDecr-endTimeIncr}`);

    await client.quit();
})()