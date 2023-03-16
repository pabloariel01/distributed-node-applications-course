const server = require('fastify')();
const fetch = require('node-fetch');
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';

const complexQuery= `query kitchenSink($id:ID){
    recipe(id:$id){
        id name
        ingredients{
            name quantity
        }
    }
    pid
}`;

server.get('/', async ()=>{
    const req = await fetch(`http://${TARGET}/graphql`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            query: complexQuery,
            variables:{id:'42'}
        })
    })
    return {
        consumer_pid:process.id,
        producer_data:await req.json()
    }
})


server.listen(PORT, HOST, () => {
    console.log(`Consumer running at http://${HOST}:${PORT}/`);
  });