var arDrone = require('ar-drone');
var express = require('express');
var cv = require('opencv');
var app = express();
/*
var video = arDrone.createClient().getVideoStream();

video.on('data',function(data){
	
});
*/
app.use(express.static('www'));
app.set('view engine','ejs');
app.get('/', function (req, res) {
    res.render('index',{ title: 'Hey', message: 'Hello there!' });
});

var server = app.listen(80, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
/*
var arDrone = require('ar-drone');
var http = require('http');
var cv = require('opencv');

try {
  var vid = new cv.VideoCapture('tcp://192.168.1.1:5555');

  vid.read(function(err, im){
    if (err) throw err;
    if (im.size()[0] > 0 && im.size()[1] > 0){

      im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
        if (err) throw err;
        if (!faces.length) return console.log("No Faces");

        var face = faces[0];
        var ims = im.size();
        var im2 = im.roi(face.x, face.y, face.width, face.height)
        im2.save('take-face-pics.jpg')
        console.log('Image saved to take-face-pics.jpg');
      })
    } else {
      console.log("Camera didn't return image")
    }
  });
} catch (e){
  console.log("Couldn't start camera", e)
}
*/
