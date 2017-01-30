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

//Globals variables
var hours;
var min;
var pace_hrs;
var pace_min;
var pace_sec;
var miles;

//Gets the homepage 
app.get('/', function(req, res){
	res.render('home');
});

//Gets the necessary information from the home page
app.post('/', function(req, res) {	
	hours = req.body.hrs;
	min = req.body.min;
	sec = req.body.sec;
	pace_hrs = req.body.pace_hrs;
	pace_min = parseInt(req.body.pace_min) + (parseInt(pace_hrs) * 60);
	pace_sec = req.body.pace_sec;
	miles = req.body.distance;
	
	format();

	var time_status = "Total time: " + hours + ':' + min + ':' + sec + '\n';
	var distance_status = "Total distance: " + miles + " miles\n";
	var pace_status = "Pace: " + pace_min + ':' + pace_sec + " (min/mile)\n";
	var hashtags = "#running #runculture #health";

	var params = {
		status: time_status + distance_status + pace_status + hashtags
	}

	//Posts to Twitter
	t.post('statuses/update', params, tweeted);

});

function format() {	

	if(parseInt(hours) < 10) {
		hours = "0" + hours;
	}
	else if(hours == "") {
		hours = "00";
	}

	if(parseInt(min) < 10) {
		min = "0" + min;
	}

	if(parseInt(sec) < 10) {
		sec = "0" + sec;
	}

	if(parseInt(pace_min) < 10) {
		pace_min = "0" + pace_min;
	}

}

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