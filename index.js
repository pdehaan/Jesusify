var jimp = require("jimp");
var path = require('path');
var mmmagic = require('mmmagic');

exports.FONT_SANS_64_RED = path.join(__dirname, "fonts/open-sans-64-red/open-sans-64-red.fnt");
exports.TEXT_IMAGE_NAME = path.join(__dirname, "images/text.png");

exports.printImage = function (destinationImage, inFileName, outFileName,
								callbackFunction, origWidth, origHeight) {
	return jimp.read(inFileName).then(function (image) {
		image.resize(destinationImage.bitmap.width >> 1,
					destinationImage.bitmap.height >> 1);

		destinationImage.composite(image,
			destinationImage.bitmap.width - image.bitmap.width,
			destinationImage.bitmap.height - image.bitmap.height
		);

		return callbackFunction(outFileName, destinationImage, origWidth,
						origHeight);
	}).catch (function (err) {
		return err + "";
	});
}

exports.printMessage = function (outFileName, destinationImage,
								origWidth, origHeight) {
	return jimp.loadFont(exports.FONT_SANS_64_RED).then(function (font) {
		var width = destinationImage.bitmap.width;
		var height = destinationImage.bitmap.height;

		return jimp.read(exports.TEXT_IMAGE_NAME).then(function (textImage) {
			textImage.resize(width, Math.min(textImage.bitmap.height, height));
			destinationImage.composite(textImage, 10, 10);
			destinationImage.write(outFileName);
			return destinationImage;
		});
	}).catch(function (err) {
		return err + "";
	});
}

exports.jesusify = function (fileName, outputName, callback) {
	var magic = new mmmagic.Magic(mmmagic.MAGIC_MIME_TYPE);

	magic.detectFile(fileName, function (err, results) {
		if (err) {
			callback(err, null);
		}
		else if (results.startsWith("image/")) {
 			jimp.read(fileName).then(function (image) {
	 			var origWidth = image.bitmap.width;
				var origHeight = image.bitmap.width;

				//Output file name must be a string
				if (outputName === undefined || outputName === null) {
					outputName = "out.jpeg";
				}
				else if (typeof outputName !== "string") {
					outputName = "out.jpeg";
				}

				exports.printImage(image, path.join(__dirname, "images/jesus_transparent.png"), outputName,
					exports.printMessage, origWidth, origHeight).then(function (res) {
						if (typeof res === "string") {
							callback(res, null);
						}
						else {
							callback(null, res);
						}
					}
				);
			});
		}
		else {
			callback("\"" + fileName + "\" is not an image file.", err);
		}
	});
};
