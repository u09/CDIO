var cv = require('opencv');

var lowThresh = 0;
var highThresh = 100;
var nIters = 2;
var minArea = 2000;
var maxArea = 2500;

var BLUE  = [0, 255, 0]; // B, G, R
var RED   = [0, 0, 255]; // B, G, R
var GREEN = [0, 255, 0]; // B, G, R
var WHITE = [255, 255, 255]; // B, G, R

try {
    var camera = new cv.VideoCapture(0);
    var window = new cv.NamedWindow('Video', 0);
    cv.createTrackbar('testTrackbar', 'Video', 0, 10, 1);

    setInterval(function() {
        camera.read(function(err, im) {
            if (err) throw err;
            width = im.width();
            height = im.height();
            var contours;
            var im_canny;
            if (im.size()[0] > 0 && im.size()[1] > 0) {
                var big = new cv.Matrix(height, width);
                var all = new cv.Matrix(height, width);

                im.convertGrayscale();
                im_canny = im.copy();

                im_canny.canny(lowThresh, highThresh);
                im_canny.dilate(nIters);

                contours = im_canny.findContours();

                for(i = 0; i < contours.size(); i++) {
                    if(contours.area(i) > maxArea) {
                        var moments = contours.moments(i);
                        var cgx = Math.round(moments.m10 / moments.m00);
                        var cgy = Math.round(moments.m01 / moments.m00);
                        big.drawContour(contours, i, GREEN);
                        big.line([cgx - 5, cgy], [cgx + 5, cgy], RED);
                        big.line([cgx, cgy - 5], [cgx, cgy + 5], RED);
                    }
                }

                all.drawAllContours(contours, WHITE);
                window.show(all);
            }
            window.blockingWaitKey(0, 50);
        });
    }, 50);

} catch (e) {
    console.log("Couldn't start camera:", e);
}