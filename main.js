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

client.takeoff();
client.calibrate(0);

setInterval(function(){
	check=true;
},5000);

s.on('data', function(im){
	if(check && !stop)
	{
		check=false;
		w=im.width();
		h=im.height();
		
		if (w < 1 || h < 1) throw new Error('Image has no size');
//		im.inRange(upper_threshold,lower_threshold);
		im.convertGrayscale();
		c = im.houghCircles(1.1, 100);
		
		if(c.length==1)
		{
			x=Math.round(c[0][0]);
			y=Math.round(c[0][1]);
			r=Math.round(c[0][2]);
			
			if(c.length==1 && x>w/2-ar/2 && x<w/2+ar/2 && y>h/2-ar/2 && y<h/2+ar/2) center=true;
			else center=false;
			console.log(c.length+"\t"+im.width()+"\t"+im.height()+"\t"+(center?"true":"false"));
			
			if(center) {
				client.front(0.1);
				client.after(2000,function(){
					this.stop();
				});
//				stop=true;
			}
			else {
				if(x<w/2-ar/2)
				{
					client.counterClockwise(0.1);
					client.after(500,function(){
						this.stop();
					});
				}
				else if(x>w/2+ar/2)
				{
					client.clockwise(0.1);
					client.after(500,function(){
						this.stop();
					});
				}
				else if(y<h/2-ar/2)
				{
					client.up(0.1);
					client.after(500,function(){
						this.stop();
					});
				}
				else if(y>h/2+ar/2)
				{
					client.down(0.1);
					client.after(500,function(){
						this.stop();
					});
				}
			}
		}
		else console.log(c.length);
	}
});

client.getPngStream().pipe(s);
client.createRepl();
