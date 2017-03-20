var arDrone = require('ar-drone');
var http = require('http');
var cv = require('opencv');
var im = arDrone.createClient().getPngStream();

try {
  var camera = new cv.VideoCapture(0);
  var window = new cv.NamedWindow('Video', 0);
  setInterval(function() {
    camera.read(function(err, im) {
      if (err) throw err;
      console.log(im.size())
      if (im.size()[0] > 0 && im.size()[1] > 0){
		  window.show(im);
      }
      window.blockingWaitKey(0, 50);
    });
  }, 20);
} catch (e){
  console.log("Couldn't start camera:", e)
}
/*


var lastPng;
pngStream.on('error',console.log).on('data',function(pngBuffer){
	cv.readImage(pngBuffer,function(err,im){
		if (err) throw err;
		if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

		im.detectObject("haarcascade_frontalface_alt.xml", {}, function(err, faces){
			if(err) throw err;
			
			for(var i = 0; i < faces.length; i++){
				var face = faces[i];
				im.ellipse(face.x+face.width/2,face.y+face.height/2,face.width/2,face.height/2);
			}
			
			im.save('image2.png');
			console.log('Image saved to image2.png');
		});
	});
	lastPng = 'data:image/png;base64,'+new Buffer(pngBuffer).toString('base64');
});

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.write('<img id="image" src="'+lastPng+'"/>');
    res.end();
});

server.listen(80,function(){
	console.log('Serving latest png on port 80 ...');
});
*/
