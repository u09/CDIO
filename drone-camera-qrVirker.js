var cv = require('opencv');
var arDrone = require('ar-drone');
var client=arDrone.createClient();
var im = arDrone.createClient().getPngStream();
var lastPng;
var Canvas = require('canvas');
var Image = Canvas.Image;
var qrcode = require('./node_modules/jsqrcode/src/qrcode.js')(Canvas);


im.on('error',console.log).on('data',function(pngBuffer){
	cv.readImage(pngBuffer,function(err,im){
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
			image.src = pngBuffer;
		});
});
