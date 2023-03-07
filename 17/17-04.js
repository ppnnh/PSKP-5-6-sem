let redis=require("redis");

let client=redis.createClient();

(async()=>{
    await client.connect();

    async function funcHSet(){
        for (let n=1; n<=10000; n++){
            await client.hSet(`${n}`,`id:${n}`,`${JSON.stringify({val:`val-${n}`})}`);
        };
    };

    async function funcHGet(){
        for (let n=1; n<=10000; n++){
            await client.hGet(`${n}`,`id:${n}`);
        };
    };

    let startTime=Date.now();
    await funcHSet();
    let endTimeHSet=Date.now();
    console.log(`hSet: ${endTimeHSet-startTime}`);

    await funcHGet();
    let endTimeHGet=Date.now();
    console.log(`hGet: ${endTimeHGet-endTimeHSet}`);

    await client.quit();
})()