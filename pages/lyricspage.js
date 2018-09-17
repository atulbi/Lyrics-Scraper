var cheerio = require("cheerio");
var rp = require('request-promise');

class LyricsPageCrawler{
	constructor(url,fn){
		this.url = url;
		rp(this.url).then((html)=>{
			let $ = cheerio.load(html);
			this.data = $(".text-center > div:nth-of-type(5)").text();
			fn(this.data);
		});	
	}
}

module.exports = LyricsPageCrawler;