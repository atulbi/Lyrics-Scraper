var cheerio = require("cheerio"),
	album 	= require("../models/album");
var rp = require('request-promise');

class ArtistPageCrawler{
	constructor(url,fn){
		this.url = url;

		function getYear($ , elem){
			let year
			try{	year=$(elem).children()['0']['next']['data'].slice(2,-1);	}	
			catch(e){	year = 'unknown';	}
			return year
		}

		function getTracksLinks($ , elem){
			let links = []
			$(elem).nextUntil(".album").filter('a').each((i , elem)=>{
				let name = $(elem).text()
				let link = $(elem).attr('href')
				if(name != ''){
					links.push({
						name : name,
						link : link
					});
				}
			});
			return links;
		}

		rp(this.url).then((html)=>{
			let $ = cheerio.load(html);
			let artist = {
				name : $(".row h1 strong").text().slice(0 , -7)
			}
			
			artist.albums = []
			$("#listAlbum > .album").each((i ,elem )=>{
				
				artist.albums[i] = {
					name: $(elem).find("b").text() != '' ? $(elem).find("b").text().slice(1,-1) : 'others' ,
					year: getYear($ , elem) , 
					links : getTracksLinks($, elem)
				}
			})
			console.log(artist)
			fn(artist);
		})
		.catch(function (err) {
        	console.log("Error At "+ url);
        	console.log(err);
   	 	});
	}
}

// new ArtistPageCrawler("https://www.azlyrics.com/e/eminem.html")

module.exports = ArtistPageCrawler;