const NodeMediaServer = require('node-media-server');

const redis = require("redis");
const client = redis.createClient({
  url: 'redis://localhost:6379/0'
});
 
client.on("error", function(error) {
  console.error(error);
});
 

const config = {
  server: {
    secret: 'secret_1'
  },
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*',
    media_root:'/tmp/media/'
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
        {
            app: 'live',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
        }
    ]
}

};

var nms = new NodeMediaServer(config)
nms.run();

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  const stream_key = getStreamKeyFromStreamPath(StreamPath)

  client.get(stream_key,(err,reply)=>{
    console.log(reply.id,args.id);
    if (err) throw err;
    let session = nms.getSession(id);

    if (reply == null){
    
      session.reject();
      return

    }
    reply = JSON.parse(reply)
    if (reply.id !== args.id ) {
      session.reject();
    }
    
  })
  
});

 
nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  const stream_key = getStreamKeyFromStreamPath(StreamPath)
  client.get(stream_key,(err,reply)=>{
    if (err) throw err;
    if (reply == null) return;
    console.log(reply);
    let session = nms.getSession(id);
    console.log("SESSION",session)
    // session.reject();
  })
});


const getStreamKeyFromStreamPath = (path) => {
  let parts = path.split('/');
  return parts[parts.length - 1];
};
