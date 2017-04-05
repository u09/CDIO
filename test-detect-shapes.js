// Detects triangles and quadrilaterals
var cv = require('opencv');

// (B)lue, (G)reen, (R)ed
var lower_threshold = [100, 100, 255];
var upper_threshold = [0, 0, 150];

var lowThresh = 0;
var highThresh = 100;
var nIters = 2;
var minArea = 2000;

var BLUE  = [0, 255, 0]; // B, G, R
var RED   = [0, 0, 255]; // B, G, R
var GREEN = [0, 255, 0]; // B, G, R
var WHITE = [255, 255, 255]; // B, G, R
var out;


try {
    var camera = new cv.VideoCapture(0);
    var window = new cv.NamedWindow('Video',0);
	
    setInterval(function() {
        camera.read(function(err, im) {
            if (err) throw err;
            if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
//            im.inRange(upper_threshold,lower_threshold);

			out = new cv.Matrix(im.height(),im.width());
			im.convertGrayscale();
			im_canny = im.copy();
			im_canny.canny(lowThresh, highThresh);
			im_canny.dilate(nIters);

			contours = im_canny.findContours();

			for (i = 0; i < contours.size(); i++) {

    if (contours.area(i) < minArea) continue;

    var arcLength = contours.arcLength(i, true);
    contours.approxPolyDP(i, 0.01 * arcLength, true);

    switch(contours.cornerCount(i)) {
      case 0:
        out.drawContour(contours, i, RED);
        break;
    }
  }
			
			
			
            window.show(out);
            window.blockingWaitKey(0, 50);
        });
    }, 50);
} catch (e) {
    console.log("Couldn't start camera:", e);
}
