console.log("Starting!");

var path = require('path');
var jimp = require('jimp');
var FONT_SANS_64_RED = require('./index').FONT_SANS_64_RED;
var width = 768;
var height = 128;

new jimp(width, height, 0xFFFFFF00, function (err, image) {
	if (err) {
		console.error("Received error 1: \"" + err + "\"");
		return;
	}
	jimp.loadFont(FONT_SANS_64_RED).then(function (font) {
		console.log("Printing at x = " + (width / 8) + "px, y = " + (height / 4) + "px");
		var message = "Jesus loves you!";

		image.print(font, width / 8, height / 4, message, 3 * width / 4);
		image.write(path.join(__dirname, "images/text.png"));
		console.log("Finished!");
	}).catch (function (err1) {
		console.error("Received error 2: \"" + err1 + "\"");
	});
});
