node-googleSearch
===

Node.js implementation of Google Search AJAX API using https://github.com/Nais/node-dom/

## Purpose:

Server side implementation of Google Search, see https://github.com/Nais/node-bot/ for examples of use

## Install :

    npm install node-googleSearch

or

    git clone http://github.com/Nais/node-googleSearch.git
    cd node-googleSearch
    npm link .

## Use :

	googlesearch.js :
	
### As a module :
	
````
	var googleSearch = require('node-googleSearch').googleSearch;
	
	var $E=encodeURIComponent;
	
	var response={
		end:function(result) {
			console.log(result);
			//output format, see below
		}
	};
	
	var params='search='+$E('nikestore nike shoe')'+'&name='+$E(nike_shoes);

	googleSearch(params,response);
````
### As a server or an API :
	
````
	var http = require('http'),  
	URL = require('url'),
	googleSearch= require('node-googleSearch').googleSearch;

	var handleRequest = function (request, response) {
	  
		var qs = URL.parse(request.url);
		  
		if (qs.pathname == '/googlesearch'){
			googleSearch(qs.query,response);
		};
	};

	http.createServer(handleRequest).listen(myport);
````
To call it directly :

http://myserver:myport/googlesearch?name=nike_shoes&search=nikestore nike shoe

Example with encoded parameters :
http://213.246.53.127:1341/googlesearch?name=nike_shoes&search=nikestore%20nike%20shoe

To call it from a script :

````
	var xscript=document.createElement('SCRIPT');
	xscript.type="text/javascript";
	var params='name=nike_shoes'+'&search='+$E(nikestore nike shoe);
	xscript.src='http://myserver:myport/googlesearch?'+params;
	document.head.appendChild(xscript);

	xscript.onload or onreadystatechange --> do what you have to do with the output
````
Output format (see more details below) : nike_shoes=(Google Search result) (where 'nike_shoes' corresponds to the parameter 'name')

Example : xscript.onload=function() {alert(nike_shoes)};

## Parameters :

name : the name that will become the name of the global var containing the result (example : nike_shoes).

search : the search string used by Google Search

## Output :

The output is an Array of :

{"unescapedUrl":xxx,"url":xxx,"visibleUrl":xxx,"title":xxx,"titleNoFormatting":xxx,"content":xxx}

See Google Search documentation
	
## Tests and API use :

See https://github.com/Nais/node-bot

Naïs server : http://213.246.53.127:1341/googlesearch?search=nais&name=company

See tests.txt in ./test


