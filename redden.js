var jimp = require("jimp");

jimp.read("images/jesus.png").then(function (image) {
	var height = image.bitmap.height;
	var width = image.bitmap.width;
	var data = image.bitmap.data;
	image.scan(0, 0, width, height, function (x, y, idx) {
		//If a pixel is sufficiently dark, then turn it red
		if (data[idx] < 127 && data[idx + 1] < 127 && data[idx + 2] < 127) {
			data[idx] = 255;
			data[idx + 1] = 0;
			data[idx + 2] = 0;
		}
		//If a pixel is sufficiently white, then make it fully transparent.
		else {
			data[idx + 3] = 0;
		}
	}).write("images/jesus_transparent.png");
}).catch(function (err) {
	console.log("Received error: \"" + err + "\"");
});
