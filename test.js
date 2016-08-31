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
