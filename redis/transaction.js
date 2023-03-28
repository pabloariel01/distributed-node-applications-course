// npm install ioredis@4.17
const Redis = require("ioredis");
const redis = new Redis("localhost:6379");

(async () => {
  const [res_srem, res_hdel] = await redis
    .multi()
    .srem("employees", "42")
    .hdel("employee-42", "company-id")
    .exec();
  console.log("srem?", !!res_srem[1], "hdel?", !!res_hdel[1]);
  redis.quit()
})();


// $ docker exec distnode-redis redis-cli SADD employees 42 tlhunter
// $ docker exec distnode-redis redis-cli HSET employee-42 company-id funcorp
// $ node redis/transaction.js
// > srem? true hdel? true