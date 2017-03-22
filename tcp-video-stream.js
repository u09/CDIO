var arDrone = require('..');

var video = arDrone.createClient().getVideoStream();

video.on('data',function(data){
	
});
video.on('error', console.log);
