const client = require("dgram").createSocket("udp4");
const host = require("os").hostname();
// const [LS_HOST, LS_PORT] = process.env.LOGSTASH.split(":");
const [LS_HOST, LS_PORT] = ('localhost:7777').split(":");

module.exports = function (severity, type, fields) {
  const payload = JSON.stringify({
    "@timestamp": new Date().toISOString(),
    "@version": 1,
    app: "web-api",
    environment: 'development',
    severity,
    type,
    fields,
    host,
  });
  console.log(payload);
  client.send(payload, LS_PORT, LS_HOST);
};
