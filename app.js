var arDrone = require('ar-drone');
var fs = require('fs');
var http = require('http');
var open = require('opencv');

var pngStream = arDrone.createClient().getPngStream();
pngStream.on('error',console.log).on('data',function(pngBuffer) {
    var img = 'data:image/png;base64,'+new Buffer(pngBuffer).toString('base64');
    var data = img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile('image.png', buf);
});

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html' });
//	res.write('<html><head><script> setInterval(function(){ document.getElementById("image").src="./image.png"; },1000); </script></head><body>');
    res.write('<img id="image" src="image.png"/>');
//	res.end('</body></html>');
    res.end();
});
server.listen(8080, function() {
    console.log('Serving latest png on port 80 ...');
});

var cv = require('/node_modules/opencv/lib/opencv');