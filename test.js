var jesusify = require('./index.js');

console.log("Converting first picture.");
jesusify.jesusify("images/martinLuther.jpeg", "martinLuther.jpeg", function (response) {
	console.log("Writing picture");
	response.write("martinLuther2.jpeg");
	console.log("Done writing picture. Open martinLuther.jpeg when this finishes");
});
