var jesusify = require('./index.js');

console.log("Converting first picture.");
jesusify.jesusify("images/martinLuther.png", "martinLuther.png",
	function (err, response) {
		if (err) {
			console.error("Received error: \"" + err + "\"");
			return;
		}

		console.log("Writing picture");
		response.write("martinLuther2.png");
		console.log("Done writing pictures. martinLuther.png" +
					" and martinLuther2.png should have the" +
					" same sha1sum and look the same.");
	}
);
