// Detects triangles and quadrilaterals
var cv = require('opencv');
var arDrone = require('ar-drone');
var client=arDrone.createClient();

// (B)lue, (G)reen, (R)ed
var lower_threshold = [100, 100, 255];
var upper_threshold = [0, 0, 150];

var s = new cv.ImageStream()
var check=false;
var center=false;
var stop=false;
var ar=50;
var c,x,y,r,w,h;
var win=new cv.NamedWindow('Video',0);

setInterval(function(){
	check=true;
},20);

s.on('data', function(im){
	if(check)
	{
		check=false;
		w=im.width();
		h=im.height();
		
		if (w < 1 || h < 1) throw new Error('Image has no size');
//		im.inRange(upper_threshold,lower_threshold);
		im.convertGrayscale();
		c = im.houghCircles(1.1, 100);
		console.log(c.length);
		for(var i=1;i<=c.length;i++) im.ellipse(c[i-1][0],c[i-1][1],c[i-1][2],c[i-1][2]);
		win.show(im);
		win.blockingWaitKey(0,50);
	}
});
client.getPngStream().pipe(s);
