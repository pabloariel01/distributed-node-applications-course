const cluster= require('cluster')
console.log(`master pid= ${process.pid}`);
cluster.setupMaster({exec: __dirname+ '/cluster-fibbonacci.js'})
cluster.fork()
cluster.fork()

cluster.on('disconnect',(worker)=>{
    console.log(`disconecterd ${worker.id}`);
}).on('exit',(worker,code,signal)=>{
    console.log('exit', worker.id,code,signal);
    // cluster.fork(); //=> this makes workers difficult to kill
}).on('listening',(worker,{address,port})=>{
    console.log('listening', worker.id, `${address}:${port}`);
})