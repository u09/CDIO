// Detects triangles and quadrilaterals
var cv = require('opencv');

// (B)lue, (G)reen, (R)ed
var lower_threshold = [46, 57, 83];
var upper_threshold = [80, 96, 115];

cv.readImage('image.png', function(err, im) {
  if (err) throw err;
  if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

  im.inRange(lower_threshold, upper_threshold);
  im.save('test-color_detected.png');
  console.log('Image saved to test-color_detected.png');
});


/*
try {
    var camera = new cv.VideoCapture(0);
    var window = new cv.NamedWindow('Video', 0);

    setInterval(function() {
        camera.read(function(err, im) {
            if (err) throw err;
            if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
            im.inRange(lower_threshold, upper_threshold);
            window.show(im);
            window.blockingWaitKey(0, 50);
        });
    }, 50);

} catch (e) {
    console.log("Couldn't start camera:", e);
}
*/