let mongoose = require("mongoose");

let songSchema = mongoose.Schema({
	name : String,
	lyrics : String,
	album : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "album"
	},
	artist : [{
		type : mongoose.Schema.Types.ObjectId,
		ref  : "artist"
	}]
});

module.exports = mongoose.model("song" , songSchema);

