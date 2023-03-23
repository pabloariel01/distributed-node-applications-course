// docker run --rm -p 6379:6379 redis:6.0
// docker run --rm -p 5432:5432 -e POSTGRES_PASSWORD=hunter2 -e POSTGRES_USER=tmp -e POSTGRES_DB=tmp postgres:12.3

// $env:PGUSER='tmp'
// $env:PGPASSWORD='hunter2'
// $env:PGDATABASE='tmp'    
// node basic-http-healthcheck.js

const server = require('fastify')();
const HOST = '0.0.0.0';
const PORT = 3300;
const redis = new (require('ioredis'))({enableOfflineQueue: false});
const pg= new (require('pg').Client)();
pg.connect();

server.get('/health', async (req,reply)=>{
    try {
        const res= await pg.query('SELECT $1::text as status',['ACK']);
        if (res.rows[0].status !== 'ACK') reply.code(500).send('DOWN')

    }catch (e){
        reply.code(500).send('DOWN')
    }
    let status = 'OK'
    try{
        if(await redis.ping()!== 'PONG') status = 'DEGRADED';
    
    } catch (e){
        status= 'DEGRADED'
    }
    reply.code(200).send(status)
})

server.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}/`));