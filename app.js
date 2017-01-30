//Setup of all packages needed and the view engine
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

//Gets the homepage 
app.get('/', function(req, res){
	res.render('home');
});

//Gets the necessary information from the home page
app.post('/', function(req, res) {	
	var hours = req.body.hrs;
	var min = req.body.min;
	var sec = req.body.sec;
	var pace_hrs = req.body.pace_hrs;
	var pace_min = req.body.pace_min;
	var pace_sec = req.body.pace_sec;
	var miles = req.body.distance;


	var params = {
		status: miles
	}

	//Posts to Twitter
	t.post('statuses/update', params, tweeted);

});

//Callback for POST
function tweeted(err, data, response) {
	if(err) {
		console.log(err);
	}
	else {
		console.log("Worked");
	}
}

app.listen(3000, function() {
	console.log("Listening on port 3000");
});