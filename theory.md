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
