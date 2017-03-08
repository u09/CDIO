var arDrone = require('ar-drone');
var http    = require('http');
var pngStream = arDrone.createClient().getPngStream();
var lastPng;

pngStream.on('error', console.log).on('data', function(pngBuffer){
	lastPng = pngBuffer;
});

var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png','refresh': 0.1});
  res.end(lastPng);
});

server.listen(80, function() {
  console.log('Server open at port: 80');
});
