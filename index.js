exports.jimp = require("jimp");

exports.quotes = [
	"I have told you these things, so that in me you mave have peace. In this world you will have trouble. But take heart! I have overcome the world. --John 16:33 (NIV)",
	"If the world hates you, understand that it hated Me first. --John 15:18 (NIV)",
	"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. --Matthew 7:7 (NIV)",
	"You see, at just the right time, when we were still powerless, Christ died for the ungodly. --Romans 5:6 (NIV)",
	"The God of peace will soon crush Satan under your feet. The grace of our Lord Jesus Christ be with you. --Romans 16:20 (NIV)",
	"The grace of our Lord Jesus Christ by with you all. Amen. --Revelation 22:21 (KJV)"
];

exports.printImage = function (destinationImage, inFileName, outFileName,
								callbackFunction, origWidth, origHeight) {
	exports.jimp.read(inFileName, function (error1, image) {
		if (error1) {
			callbackFunction(error1, outFileName, destinationImage);
			return;
		}

		image.resize(destinationImage.bitmap.width >> 1, destinationImage.bitmap.height >> 1);

		destinationImage.composite(image,
			destinationImage.bitmap.width - image.bitmap.width,
			destinationImage.bitmap.height - image.bitmap.height
		);

		callbackFunction(null, outFileName, destinationImage, origWidth, origHeight);
	});
}

exports.printMessage = function (error, outFileName, destinationImage,
								origWidth, origHeight) {
	if (error) {
		console.error("Received error: \"" + error + "\"");
		return;
	}

	exports.jimp.loadFont(
'fonts/open-sans-64-red/open-sans-64-red.fnt').then(function (font) {
		var quotes = exports.quotes;
		var width = destinationImage.bitmap.width;
		var height = destinationImage.bitmap.height;
		var index = Math.floor(Math.random() * quotes.length) % quotes.length;
		destinationImage.print(font, width >> 3, height / 3,
			quotes[index] + "", width - width >> 2);
		destinationImage.resize(origWidth, origHeight);
		destinationImage.write(outFileName);
	}).catch(function (error2) {
		console.error("Received error: \"" + error2 + "\"");
	});
}

exports.jesusify = function (fileName, outputName) {
	exports.jimp.read(fileName, function (error1, image) {
		if (error1) {
			console.error("Received error: \"" + error1 + "\"");
			process.exit(-1);
		}

		//Output file name must be a string and must have a .png extension.
		if (outputName === undefined || outputName === null) {
			outputName = "out.png";
		}
		else if (typeof outputName !== "string") {
			outputName = "out.png";
		}
		else if (!outputName.endsWith(".png")) {
			outputName += ".png";
		}

		var origWidth = image.bitmap.width;
		var origHeight = image.bitmap.width;

		image.resize(Math.max(image.bitmap.width, 512),
					Math.max(image.bitmap.height, 512));
		exports.printImage(image, "images/jesus.png", "out.png",
							exports.printMessage, origWidth, origHeight);
	});
};

exports.jesusify("images/person.jpeg");
