let mongoose = require("mongoose"),
	song	 = require("./song");

let albumSchema = mongoose.Schema({
	name: String,
	pic : String,
	year : String,
	songs : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'song'
	}],
	artist : [{
		type : mongoose.Schema.Types.ObjectId,
		ref	 : 'artist'
	}]
});

module.exports = mongoose.model("album" , albumSchema);