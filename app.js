let cheerio 	= require("cheerio"),
	request 	= require("request"),
	Album 		= require("./models/album"),
	Artist		= require("./models/artist"),
	Song 		= require("./models/song"),
	LyricsPage 	= require("./pages/lyricspage"),
	ArtistPage 	= require("./pages/artistpage"),
	mongoose 	= require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

var k = new ArtistPage('https://www.azlyrics.com/e/eminem.html', function(res){
	// console.log(res);

	// Artist Object 
	let artist_details = new Artist({
		_id  : new mongoose.Types.ObjectId(),
		name : res['name'],
		albums : []
	});

	let i =1;
	for (album of res['albums']) {

		// album Object
		let album_details = new Album({
			_id		: new mongoose.Types.ObjectId(),
			name 	: album['name'],
			year 	: album['year'],
			artist 	: artist_details._id,
			songs	: []
		})


		artist_details.albums.push(album_details._id);


		for (links of album['links']) {
			let lyricsurl = 'https://www.azlyrics.com' + links['link'].substr(2);		
			let name = links['name'];
			setTimeout(()=>{
				console.log(lyricsurl)
				console.log(name)
				new LyricsPage(lyricsurl , function(lyrics){
					console.log('.');
				});
			},i*3000);
			i++;
			if(i%3 == 0){
				break;
			}
		}
		setTimeout(()=>{
			album_details.save(function(err){
				if(err){
					console.log(err);
				}else{
					console.log("ALBUM DETAILS SAVED")
				}
			});
		},i*3000);		
	}
	artist_details.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log("ARTIST DETAILS SAVED")
		}
	});


});
