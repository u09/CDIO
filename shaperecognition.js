var cv = require('opencv');
var video = new cv.VideoCapture(0);
var win = new cv.NamedWindow('Video',0);

const WHITE = [255, 255, 255];
let contours = img.contours();
let largestContourImg;
let largestArea = 0;
let largestAreaIndex;

for (let i = 0; i < contours.size(); i++) {
	if (contours.area(i) > largestArea) {
		largestArea = contours.area(i);
		largestAreaIndex = i;
	}
}

largestContourImg.drawContour(contours, largestAreaIndex, GREEN, thickness, lineType);

setInterval(function() {
	video.read(function(err, im) {
		if (err) throw err;
		console.log(im.size())
		if (im.size()[0] > 0 && im.size()[1] > 0){
//			im.convertHSVscale();
			win.show(im);
		}
		win.blockingWaitKey(0, 50);
	});
}, 20);
