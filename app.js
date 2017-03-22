var arDrone = require('ar-drone');
var client=arDrone.createClient();
var cv = require('opencv');
var im = arDrone.createClient().getPngStream();
var lastPng;
var check=false;
var land=false;
var stop=false;
var antal=0;

setInterval(function(){
	check=true;
},10000);

im.on('error',console.log).on('data',function(pngBuffer){
	if(check)
	{
		if(land)
		{
			client.land();
			land=false;
			stop=true;
		}
		check=false;
		cv.readImage(pngBuffer,function(err,im){
			if (err) throw err;
			if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

			im.detectObject("face-detection.xml", {}, function(err, faces){
				if(err) throw err;
				antal=faces.length;
				console.log('Antal faces: '+antal);
				if(antal==2 && stop==false){
					client.takeoff();
					land=true;
				}
				/*
				for(var i = 0; i < faces.length; i++){
					var face = faces[i];
					im.ellipse(face.x+face.width/2,face.y+face.height/2,face.width/2,face.height/2);
				}
				
				im.save('image2.png');
				*/
			});
		});
		lastPng = 'data:image/png;base64,'+new Buffer(pngBuffer).toString('base64');
	}
});
