let mongoose = require("mongoose"),
	song	 = require("./song"),
	album 	 = require("./album");

let artistSchema = mongoose.Schema({
	name 	: String , 
	pic  	: String , 
	albums	: [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'album'
	}]
});