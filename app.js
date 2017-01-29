var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true})); 

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

var twit = require('twit');

var index = require('./index');

var t = new twit(index);

function tweeted(err, data, response) {
	if(err) {
		console.log("error");
	}
	else {
		console.log("worked!");
	}
}

app.get('/', function(req, res){
	res.render('home');
});

app.post('/', function(req, res){	
	var temp = req.body.distance;
	console.log(temp);
});

var info = {

}

var params = {
	status: "hello world!"
}

//t.post('statuses/update', params, tweeted);

app.listen(3000, function() {
	console.log("Listening on port 3000");
});