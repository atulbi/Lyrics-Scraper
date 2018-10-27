let cheerio 	= require("cheerio"),
	request 	= require("request"),
	album 		= require("./models/album"),
	song 		= require("./models/song"),
	LyricsPage 	= require("./pages/lyricspage"),
	ArtistPage 	= require("./pages/artistpage"),
	mongoose 	= require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

var k = new ArtistPage('https://www.azlyrics.com/e/eminem.html', function(res){
	console.log(res);
	let i =1;
	for (album of res['albums']) {
		for (links of album['links']) {
			console.log(album['name'])
			let lyricsurl = 'https://www.azlyrics.com' + links['link'].substr(2);		
			setTimeout(()=>{
				console.log(lyricsurl)
				new LyricsPage(lyricsurl , function(lyrics){
					console.log('.');
				});
			},i*10000);
			i++;
		}
	}
});
