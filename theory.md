##LOGGING 
    -elk elasticsearch, logstash and kibana

##METRICS
    graphite, statsD and grafana
    ststsD: collects node metrics
    graphite: time series db adn carbon sservice
    graphana dashboards

##DOCKER
    docker history grafana/grafana:6.5.2 to see leayers
    As a rule of thumb, if your application works with Alpine
    --rm removes once finished
    --it interactive ttl
    ometimes it’s beneficial to run a sidecar process within a Docker container. A sidecar is an external process that performs certain duties
    docker exec ephemeral /bin/ls /var to execute a new command within your running container
    EXPOSE directive is a way of documenting that the image plans on listening using a specific port, in this case 1337. This doesn’t actually open the port

##REQUIRE
    require(mod):

        If mod is the name of a core Node.js module (like fs), then load it.

        If mod starts with “/”, “./”, or “../”, load the resolved path to the file or directory.

        If a directory is loaded, look for a package.json file with a main field and load that file.

        If a directory doesn’t contain a package.json, try to load index.js.

        If loading a file, try to load the exact filename, then fall back to adding file extensions .js, .json, and .node (native module).

        Look for a directory in ./node_modules matching the mod string.

        Look for a node_modules directory in each parent directory until the root directory is encountered.

        When modules are loaded within a running Node.js process, they get added to something called the require cache. The cache is located at require.cache and is available to every module

        ^ (caret). What this means is that any future version of the package that is compatible with the specified version will be installed

         npm package is a collection of Node.js modules and other supporting files that have been combined into a single tarball file
         npm CLI and run the npm publish command, then you would create a new public package. When you publish a package, the versions that are published are essentially immutable


handling unhandled errors

```
process.on('uncaughtException', (error) => {
  logger.send("An uncaught exception has occured", error, () => {
    console.error(error);
    process.exit(1);
  });
});
```

promise rejections
```
Promise.reject(new Error('oh no'));

(async () => {
  throw new Error('oh no');
})();
```
to log
```
process.on('unhandledRejection', (reason, promise) => {});
```
Signals
    Signals are a mechanism provided by the operating system to allow programs to receive short “messages” from the kernel or from other programs
    ```
    process.on('SIGHUP', () => console.log('Received: SIGHUP'));
    process.on('SIGINT', () => console.log('Received: SIGINT'));
```


###reconnection to DB

docker run --name distnode-postgres  -it --rm -p 5432:5432 -e POSTGRES_PASSWORD=hunter2 -e POSTGRES_USER=user -e POSTGRES_DB=dbconn postgres:12.3

##pooling
  keep in mind service instances to determine max connection pool size(less than half of connections), 6 servers, 100 conns => 50(half)/6(servers)= 8(max)

  pooling is faster than many querys over same connection

##migrations with knex

  $ mkdir migrations && cd migrations
$ npm init -y
$ npm install knex@0.21 pg@8.2
$ npm install -g knex@0.21
$ knex init


knex migrate:currentVersion

knex migrate:make create_users

knex migrate:list
knex migrate:up

knex migrate:make create_groups
knex migrate:latest


###failures
HTTP errors in the 5XX range, require some further consideration. If the request is considered idempotent(GET|PUT|DELETE), then it may be retried(all verbs but POST); otherwise, the request should be considered a failure at that point.

Any message that results in a 4XX HTTP error should not be retried

##distributed primitives

redis
docker run -it --rm --name distnode-redis p 6379:6379  redis:6.0.5-alpine
docker exec -it distnode-redis redis-cli


Atomicity is a property of a series of actions where either all or none of the actions are performed

Redis does provide a mechanism to ensure that multiple commands are executed atomically.(MULTI,EXEC)

lua scripts" perform atomically:
  As a rule of thumb, you should only use Lua scripts if it’s impossible to perform the same actions atomically with regular commands and transactions

  ##kubernetes secrets
  ```
  apiVersion: v1
kind: Secret
metadata:
  name: redisprod
type: Opaque
stringData:
  redisconn: "redis://admin:hunter2@192.168.2.1"
  ```

  to read 
  ```
  env:
- name: REDIS
  valueFrom:
    secretKeyRef:
      name: redisprod
      key: redisconn
  ```