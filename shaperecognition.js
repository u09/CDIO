var cv = require('opencv');
var video = new cv.VideoCapture(0);
var win = new cv.NamedWindow('Video',0);

setInterval(function() {
	video.read(function(err, im) {
		if (err) throw err;
		console.log(im.size())
		if (im.size()[0] > 0 && im.size()[1] > 0){
			im.convertHSVscale();
			im.inRange(hsv_image, cv::Scalar(0, 100, 100), cv::Scalar(10, 255, 255), lower_red_hue_range);
			cv::inRange(hsv_image, cv::Scalar(160, 100, 100), cv::Scalar(179, 255, 255), upper_red_hue_range);
			win.show(im);
		}
		win.blockingWaitKey(0, 50);
	});
}, 20);
