var jesusify = require('./index.js');
var path = require('path');

console.log("Converting first picture.");
jesusify.jesusify(path.join(__dirname, "images/martinLuther.png"),
				path.join(__dirname, "martinLuther.png"),
	function (err, image) {
		if (err) {
			console.error("Received error: \"" + err + "\"");
			return;
		}

		console.log("Writing picture");
		image.write(path.join(__dirname, "martinLuther2.png"));
		console.log("Done writing pictures. martinLuther.png" +
					" and martinLuther2.png should have the" +
					" same sha1sum and look the same.");
	}
);

jesusify.jesusify(path.join(__dirname, "images/notAnImage.png"),
				path.join(__dirname, "notAnImage.png"),
	function (err, image) {
		if (err) {
			console.error("Received error: \"" + err + "\"");
			return;
		}

		console.log("Writing picture");
		image.write(path.join(__dirname, "notAnImage2.png"));
		console.log("Done writing pictures. notAnImage.png" +
					" and notAnImage2.png should have the" +
					" same sha1sum and look the same.");
	}
);

jesusify.jesusify(path.join(__dirname, "images/martinLuther.jpeg"),
				path.join(__dirname, "martinLuther.jpeg"),
	function (err, image) {
		if (err) {
			console.error("Received error: \"" + err + "\"");
			return;
		}

		console.log("Writing picture");
		image.write(path.join(__dirname, "martinLuther2.jpeg"));
		console.log("Done writing pictures. martinLuther.jpeg" +
					" and martinLuther2.jpeg should have the" +
					" same sha1sum and look the same.");
	}
);
