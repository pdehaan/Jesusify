var jimp = require("jimp");
var path = require('path');

exports.FONT_SANS_64_RED = path.join(__dirname, "fonts/open-sans-64-red/open-sans-64-red.fnt");

exports.printImage = function (destinationImage, inFileName, outFileName,
								callbackFunction, origWidth, origHeight) {
	jimp.read(inFileName, function (error1, image) {
		if (error1) {
			callbackFunction(error1, outFileName, destinationImage);
			return;
		}

		image.resize(destinationImage.bitmap.width >> 1,
					destinationImage.bitmap.height >> 1);

		destinationImage.composite(image,
			destinationImage.bitmap.width - image.bitmap.width,
			destinationImage.bitmap.height - image.bitmap.height
		);

		callbackFunction(null, outFileName, destinationImage, origWidth,
						origHeight);
	});
}

exports.printMessage = function (error, outFileName, destinationImage,
								origWidth, origHeight) {
	if (error) {
		console.error("Received error: \"" + error + "\"");
		return;
	}

	jimp.loadFont(exports.FONT_SANS_64_RED).then(function (font) {
		var width = destinationImage.bitmap.width;
		var height = destinationImage.bitmap.height;
		var message = "Jesus loves you!";

		destinationImage.print(font, width >> 3, height >> 3, message,
								width - width >> 2);
		destinationImage.write(outFileName);
	}).catch(function (error2) {
		console.error("Received error: \"" + error2 + "\"");
	});
}

exports.jesusify = function (fileName, outputName) {
	jimp.read(fileName, function (error1, image) {
		if (error1) {
			console.error("Received error: \"" + error1 + "\"");
			return;
		}

		//Output file name must be a string and must have a .jpeg extension.
		if (outputName === undefined || outputName === null) {
			outputName = "out.jpeg";
		}
		else if (typeof outputName !== "string") {
			outputName = "out.jpeg";
		}
		else if (!outputName.endsWith(".jpeg") && !outputName.endsWith(".jpg")) {
			outputName += ".jpeg";
		}

		var origWidth = image.bitmap.width;
		var origHeight = image.bitmap.width;

		exports.printImage(image, path.join(__dirname, "images/jesus.png"), outputName,
							exports.printMessage, origWidth, origHeight);
	});
};
