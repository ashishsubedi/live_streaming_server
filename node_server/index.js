const NodeMediaServer = require('node-media-server');
// const redis = require("redis");
// const client = redis.createClient({
//   url: 'redis://localhost:6379/'

// });

// client.on("error", function(error) {
//   console.error(error);
// });


const config = {
  rtmp: {
    app: 'test',
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};
 
var nms = new NodeMediaServer(config)
nms.run();
