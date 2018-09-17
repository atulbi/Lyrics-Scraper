var cheerio = require("cheerio");
var rp = require('request-promise');

class ArtistPageCrawler{
	constructor(url){
		this.url = url;

		function getYear($ , elem){
			let year
			try{	year=$(elem).children()['0']['next']['data'];	}	
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

			let albums = []
			$("#listAlbum > .album").each((i ,elem )=>{
				
				albums[i] = {
					name: $(elem).find("b").text() != '' ? $(elem).find("b").text() : 'others' ,
					year: getYear($ , elem) , 
					links : getTracksLinks($, elem)
				}
			});
		});
	}
}

module.exports = ArtistPageCrawler;