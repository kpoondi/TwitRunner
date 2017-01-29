//Takes the needed elements from html file
var calc = document.getElementById("calculate");
var resetter = document.getElementById("reset");
var time = document.getElementById("time");
var distance = document.getElementById("miles");
var dropdown = document.getElementById("myList");
var dropArr = {
	"Marathon": 26.2,
	"Half-Marathon": 13.1,
	"5K": 3.1,
	"10K": 6.2,
	"8K": 4.97
}

function whichDistance() {
	if (dropdown.options[dropdown.selectedIndex].text == "Click to choose:") {
		clear_error();
	}
	else {
		distance.elements["distance"].value = dropArr[dropdown.options[dropdown.selectedIndex].text];
		clear_error();
	}
}

//Resets all the input boxes 
function clear_error() {
	for (var i = 0; i < time.length; i++) {
		time[i].classList.remove("error");
	}

	for (var i = 0; i < miles.length; i++) {
		miles[i].classList.remove("error");
	}
	getInfo();
}

//After a click is made, acquires the necessary information from input blocks
function getInfo() {
	var mile = distance.elements["distance"].value;
	var hour = time.elements["hrs"].value;
	var min = time.elements["min"].value;
	var sec = time.elements["sec"].value;
	var valid = checkInput (mile, hour, min, sec);

	if (valid) {
		makePace(mile, hour, min, sec);
	}
	else {
		calc.addEventListener("click", whichDistance);
	}
}

//Checks all the inputs for validity
function checkInput(mile, hour, min, sec)  {
	error = "ERROR(s):\n";
	var error_count = 0;

	if (isNaN(parseInt(mile))) {
		distance.elements["distance"].classList.add("error");
		error += "Invalid Mileage: Enter numbers only\n";
		error_count++;
	}

	if (isNaN(hour)) {
		time.elements["hrs"].classList.add("error");
		error += "Invalid Hour: Enter numbers only\n";
		error_count++;
	}

	if (isNaN(parseInt(min)) || 60 <= min || min < 0){
		time.elements["min"].classList.add("error");
		error += "Invalid Minutes: Enter numbers between 0 and 59 only\n";
		error_count++;
	}

	if (isNaN(parseInt(sec)) ||  60 <= sec || sec < 0) {
		time.elements["sec"].classList.add("error");
		error += "Invalid Seconds: Enter numbers between 0 and 59 only\n";
		error_count++;
	}

	if (error_count > 0) {
		alert(error);
		return false;
	}

	return true;

}

//Calculates the pace 
function makePace(mile, hour, min, sec) {
	var totalMins = hour * 60  + parseInt(min) + parseFloat(sec/60);
	var answer = parseFloat(totalMins/parseFloat(mile));

	var hour_pace = 0;
	while (answer > 60) {
		answer -= 60;
		hour_pace += 1;
	}
	var min_pace = parseInt(answer);
	var sec_pace = parseInt((answer - min_pace) * 60);
	paceFormat(hour_pace, min_pace, sec_pace);
}

//Pads the output 
function paceFormat(hour_pace, min_pace, sec_pace) {
	if (hour_pace < 10) {
		hour_pace = "0" + hour_pace;
	}

	if (min_pace < 10) {
		min_pace = "0" + min_pace;
	}

	if (sec_pace < 10) {
		sec_pace = "0" + sec_pace;
	}

	paceOutput(hour_pace, min_pace, sec_pace);
}


//Outputs the calculated pace
function paceOutput (hour_pace, min_pace, sec_pace) {
	document.getElementById("pace_hrs").value = hour_pace;
	document.getElementById("pace_min").value = min_pace;
	document.getElementById("pace_sec").value = sec_pace;
}

//resets the entire page
function reset() {
	
 	dropdown.options.selectedIndex = 0;
	document.getElementById("pace_hrs").value = "";
	document.getElementById("pace_min").value = "";
	document.getElementById("pace_sec").value = "";
	distance.elements["distance"].value = "";
	time.elements["hrs"].value = "";
	time.elements["min"].value = "";
	time.elements["sec"].value = "";
}

//main
function main() {
	calc.addEventListener("click", whichDistance);
	resetter.addEventListener("click", reset);
}

main();
