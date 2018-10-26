let mongoose = require("mongoose"),
	song	 = require("./song") 

let albumSchema = mongoose.Schema({
	name: String,
	pic : String,
	songs : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'song'
	}]
});

module.exports = mongoose.model("album" , albumSchema);