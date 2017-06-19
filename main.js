var arDrone = require('ar-drone');
var cv = require('opencv');
var client=arDrone.createClient();

var lower_threshold = [100, 100, 255];
var upper_threshold = [0, 0, 150];

var s = new cv.ImageStream();
var check=false;
var center=false;
var stop=false;
var ar=50;
var c,x,y,r,w,h;
var delay=250

client.createRepl();

console.log("Igang med Takeoff");
client.takeoff();
client.after(5000,function(){
	console.log("Takeoff færdig.");
	console.log("Igang med Calibrate");
	client.calibrate(0);
});
client.after(7000,function(){
	console.log("Calibrate færdig.");
	console.log("Igang med at sætte den ønskede højde.");
	client.up(0.5)
});
client.after(2000,function(){
	console.log("Højde sat.");
	this.stop();
});

client.after(2000,function(){
	console.log("Starter billedgenkendelse");
	setInterval(function(){
		check=true;
	},5000);
});

s.on('data', function(im){
	if(check && !stop)
	{
		check=false;
		w=im.width();
		h=im.height();
		
		if (w < 1 || h < 1) throw new Error('Image has no size');
		
//		im.inRange(upper_threshold,lower_threshold);
		im.convertGrayscale();
		c = im.houghCircles(1.2, 100);
		
		if(c.length==1)
		{
			x=Math.round(c[0][0]);
			y=Math.round(c[0][1]);
			r=Math.round(c[0][2]);
			console.log(x+" "+y+" "+r);
			if(c.length==1 && x>w/2-ar/2 && x<w/2+ar/2 && y>h/2-ar/2 && y<h/2+ar/2) center=true;
			else center=false;
			console.log(c.length+"\t"+im.width()+"\t"+im.height()+"\t"+(center?"true":"false"));
			
			if(center) {
				client.front(0.1);
				client.after(3500,function(){
					this.stop();
				});
//				stop=true;
			}
			else {
				if(x<w/2-ar/2)
				{
					client.left(0.1);
					client.after(delay,function(){
						this.stop();
					});
				}
				else if(x>w/2+ar/2)
				{
					client.right(0.1);
					client.after(delay,function(){
						this.stop();
					});
				}
				else if(y<h/2-ar/2)
				{
					client.up(0.1);
					client.after(delay,function(){
						this.stop();
					});
				}
				else if(y>h/2+ar/2)
				{
					client.down(0.1);
					client.after(delay,function(){
						this.stop();
					});
				}
			}
		}
		else console.log(c.length);
	}
});

client.getPngStream().pipe(s);
