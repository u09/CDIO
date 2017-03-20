var cv = require('opencv');

cv.readImage("image.png", function(err, im){
	if (err) throw err;
	if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

	im.detectObject("haarcascade_frontalface_alt.xml", {}, function(err, faces){
		if(err) throw err;
		
		for(var i = 0; i < faces.length; i++){
			var face = faces[i];
			im.ellipse(face.x+face.width/2,face.y+face.height/2,face.width/2,face.height/2);
		}
		
		im.save('image2.png');
		console.log('Image saved to image2.png');
	});
});
