var http = require('http'),
	dom = require('node-dom').dom, 
	URL = require('url');

var googleSearch = function(query,response){

	//http://213.246.53.127:1340/googlesearch?name=essai&search=parquet

	var params={}; //search

	query.split('&').forEach(function(param){
		var parts = param.split('=');
		params[parts[0].trim()] = (decodeURIComponent(parts[1]) || '').trim();
	});

	var page='<html><head></head><body></body><script type="text/javascript" src="http://www.google.com/jsapi?autoload=%7B%22modules%22%3A%5B%7B%22name%22%3A%22search%22%2C%22version%22%3A%221%22%2C%22callback%22%3A%22Loaded%22%2C%22nocss%22%3A%22true%22%7D%5D%7D"></script></html>';

	var ini=new Date().valueOf();

	var mdebug=console.log;

	var options =	{	url:URL.parse('http://www.google.com/'), //not used
						ini: ini,
						features: {
									FetchExternalResources  : {script:''},
									ProcessExternalResources: {script:''},
									removeScript: true
						}
	};

	window=dom(page,null,options);

	document=window.document;

	window.Loaded=function() {

		var xlocalSearch = new window.google.search.WebSearch();

		xlocalSearch.setSearchCompleteCallback(xlocalSearch , function() {

			var res=xlocalSearch.results;

			var l=res.length;

			var RES=[];

			for (var i=0;i<l;i++) {
				RES.push({unescapedUrl:res[i].unescapedUrl,url:res[i].url,visibleUrl:res[i].visibleUrl,title:res[i].title,titleNoFormatting:res[i].titleNoFormatting,content:res[i].content});
			};

			var tmp=new Date().valueOf()-ini;

			mdebug('Response '+tmp);

			var head = {'Content-Type': 'text/javascript' };

			if (response.writeHead) {

				response.writeHead(200, head);

				response.end(params.name+'='+JSON.stringify(RES)+';');

			} else {
				response.end(RES);
			}

		});

		xlocalSearch.execute(params.search);
	}

};

var handleRequest = function (request, response) {

	var qs = URL.parse(request.url);

	if (qs.pathname == '/googlesearch'){
		try {
			googleSearch(qs.query,response);
		} catch(ee) {
			response.end('Bad formatted request');
		};
	};

};

var launchServer = function(port) {
	http.createServer(handleRequest).listen(port);
};

exports.launchServer = launchServer;
exports.googleSearch = googleSearch;
