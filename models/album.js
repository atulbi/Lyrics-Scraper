let mongoose = require("mongoose"),
	song	 = require("./song");

let albumSchema = mongoose.Schema({
	name: String,
	pic : {
		type: String,
		default : "https://image.freepik.com/free-icon/music-album_318-43305.jpg"
	},
	year : String,
	songs : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'song'
	}],
	artist : {
		type : mongoose.Schema.Types.ObjectId,
		ref	 : 'artist'
	},
	feat 	: String
});

module.exports = mongoose.model("album" , albumSchema);