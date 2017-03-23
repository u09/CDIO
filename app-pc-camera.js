var cv = require('opencv');

try {
    var camera = new cv.VideoStream(0);
    var window = new cv.NamedWindow('Video', 0);

    setInterval(function() {
        camera.read(function(err, im) {
            console.log("test1");
            if (err) throw err;
            console.log("test2");
            console.log(im.size());
            console.log("test3");
            if (im.size()[0] > 0 && im.size()[1] > 0) {
                console.log("test4");
                window.show(im);
                console.log("test5");
            }
            console.log("test6");
            window.blockingWaitKey(0, 50);
            console.log("test7");
        });
    }, 20);

} catch (e) {
    console.log("Couldn't start camera:", e);
}