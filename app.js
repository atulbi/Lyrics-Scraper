var cheerio 	= require("cheerio");
var request 	= require('request');
var LyricsPage 	= require("./pages/lyricspage")
var ArtistPage 	= require("./pages/artistpage")

var k = new ArtistPage('https://www.azlyrics.com/e/eminem.html', function(res){
	console.log(res);
	let i =1;
	for (album of res) {
		for (links of album['links']) {

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


