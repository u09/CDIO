var cv = require('opencv');
var antal = -1;

try {
    var camera = new cv.VideoCapture(0);
    var window = new cv.NamedWindow('Video', 0);

    setInterval(function() {
        camera.read(function(err, im) {
            if (err) throw err;
            if (im.size()[0] > 0 && im.size()[1] > 0) {
                im.detectObject("haarcascade_smile.xml", {}, function(err, faces){
                    if(err) throw err;
                    if(antal != faces.length) {
                        antal = faces.length;
                        console.log("Antal ansigter: " + antal);
                    }
                    for(var i = 0; i < faces.length; i++){
                        var face = faces[i];
                        im.ellipse(face.x+face.width/2,face.y+face.height/2,face.width/2,face.height/2);
                    }
                    window.show(im);
                });
            }
            window.blockingWaitKey(0, 50);
        });
    }, 50);

} catch (e) {
    console.log("Couldn't start camera:", e);
}