var cheerio = require("cheerio");
var request = require('request');
var LyricsPage = require("./pages/lyricspage")
var ArtistPage = require("./pages/artistpage")

var k = new LyricsPage('https://www.azlyrics.com/lyrics/eminem/notafraid.html', function(res){
	console.log(res);
});


