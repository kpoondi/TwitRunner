var twit = require('twit');
console.log("Running...");

var index = require('./index');

var t = new twit(index);

var params = {
	status: "hello world!"
}

t.post('statuses/update', params, tweeted);

function tweeted(err, data, response) {
	if(err) {
		console.log("error");
	}
	else {
		console.log("worked!");
	}
}