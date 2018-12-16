let cheerio 	= require("cheerio"),
	request 	= require("request"),
	Album 		= require("./models/album"),
	Artist		= require("./models/artist"),
	Song 		= require("./models/song"),
	LyricsPage 	= require("./pages/lyricspage"),
	ArtistPage 	= require("./pages/artistpage"),
	mongoose 	= require("mongoose");

// mongoose.connect(process.env.DATABASE_URL);
mongoose.connect("mongodb://localhost/lyricxhunt");

let URL='';

if(process.argv.length <= 2){
	console.log("USAGE : node app.js \"<Artist Name>\"");
	return;
}else{
	let artistName = '' , indexTitle = '';
	let strs = process.argv[2].split(" ");
	for (let x of strs)
		artistName += x.toLowerCase();
	indexTitle = artistName[0].toLowerCase().match(/[a-z]/) == null ? '19' : artistName[0].toLowerCase();
	URL = 'https://www.azlyrics.com/' + indexTitle + '/' + artistName + '.html'
}

console.log(URL);

var k = new ArtistPage(URL, function(res){

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
		songsPromise = [];
		for (links of album['links']) {
			let lyricsurl = 'https://www.azlyrics.com' + links['link'].substr(2);		
			let name = links['name'];
			thisTrackPromise =  new Promise((resolve , reject)=>{
				setTimeout(()=>{
					console.log(lyricsurl)
					console.log(name)
					try{
						new LyricsPage(lyricsurl , function(lyrics){
							console.log('.');
							resolve({
								name : name,
								lyrics : lyrics
							});
						});
					}
					catch(ex){
						reject(new Error("CANNOT FIND LYRICS AT "+lyricsurl));
					}
				},i*10000);
				i++;
			});
			songsPromise.push(thisTrackPromise);
		}
		
		Promise.all(songsPromise)
		.then((values) =>{
			for(let x of values){
				console.log(x['name']);
			}
		})
		.catch((err) =>{
			console.log(err);
		});		
	}
	artist_details.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log("ARTIST DETAILS SAVED")
		}
	});


});
