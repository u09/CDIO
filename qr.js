var cv = require('opencv');
var Canvas = require('canvas');
var Image = Canvas.Image;
var qrcode = require('./node_modules/jsqrcode/src/qrcode.js')(Canvas);

cv.readImage("image.png", function(err, im){
	if (err) throw err;
	if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
	var image = new Image()
	image.onload = function(){
		var result;
		try {
			result = qrcode.decode(image)
			console.log('result of qr code: ' + result);
		} catch(e){
			console.log('unable to read qr code');
		}
	}
	image.src = "image.png";
});
