var arDrone = require('ar-drone');
var cv = require('opencv');
var fs = require('fs');
var http = require('http');
var pngStream = arDrone.createClient().getPngStream();
/*
pngStream.on('error',console.log).on('data',function(pngBuffer) {
    var img = 'data:image/png;base64,'+new Buffer(pngBuffer).toString('base64');
    var data = img.replace(/^data:image\/\w+;base64,/,"");
    var buf = new Buffer(data, 'base64');
    fs.writeFile('image.png', buf);
});
*/
cv.readImage("image.png", function(err, im){
  if (err) throw err;
  if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

  im.detectObject("../data/haarcascade_frontalface_alt.xml", {}, function(err, faces){
    if (err) throw err;

    for (var i = 0; i < faces.length; i++){
      var face = faces[i];
      im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2);
    }

    im.save('./tmp/face-detection.png');
    console.log('Image saved to ./tmp/face-detection.png');
  });
});
