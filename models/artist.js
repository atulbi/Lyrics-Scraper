let mongoose = require("mongoose"),
	song	 = require("./song"),
	album 	 = require("./album");

let artistSchema = mongoose.Schema({
	name 	: String , 
	pic  	: {
		type 	:	String,
		default :	'https://image.flaticon.com/icons/svg/199/199478.svg'
	}, 
	albums	: [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'album'
	}]
});

module.exports = mongoose.model("artist" , artistSchema);