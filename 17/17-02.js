let redis=require("redis");

let client=redis.createClient();

(async()=>{
    await client.connect();

    async function funcSet(){
        for (let n=1; n<=10000; n++){
            await client.set(`${n}`, `set${n}`);
        };
    };

    async function funcGet(){
        for (let n=1; n<=10000; n++){
           await client.get(`${n}`);
        };
    };

    async function funcDel(){
        for (let n=1; n<=10000; n++){
            await client.del(`${n}`);
        };
    };

    let startTime=Date.now();
    await funcSet();
    let endTimeSet=Date.now();
    console.log(`set: ${endTimeSet-startTime}`);

    await funcGet();
    let endTimeGet=Date.now();
    console.log(`get: ${endTimeGet-endTimeSet}`);

    await funcDel();
    let endTimeDel=Date.now();
    console.log(`del: ${endTimeDel-endTimeGet}`);
    
    await client.quit();
})()