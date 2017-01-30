//Takes the needed elements from html file
var calc = document.getElementById("calculate");
var resetter = document.getElementById("reset");
var form = document.getElementById("general");

//Resets all the input boxes 
function clear_error() {
	for (var i = 0; i < form.length; i++) {
		form[i].classList.remove("error");
	}
	getInfo();
}

//After a click is made, acquires the necessary information from input blocks
function getInfo() {
	var mile = form.elements["distance"].value;
	var hour = form.elements["hrs"].value;
	var min = form.elements["min"].value;
	var sec = form.elements["sec"].value;
	var valid = checkInput (mile, hour, min, sec);
	if (valid) {
		makePace(mile, hour, min, sec);
		clear_error();
	}
	else {
		calc.addEventListener("click", getInfo);
	}
}

//Checks all the inputs for validity
function checkInput(mile, hour, min, sec)  {
	error = "ERROR(s):\n";
	var error_count = 0;

	if (isNaN(parseInt(mile))) {
		form.elements["distance"].classList.add("error");
		error += "Invalid Mileage: Enter numbers only\n";
		error_count++;
	}

	if (isNaN(parseInt(hour)) && hour != "") {
		form.elements["hrs"].classList.add("error");
		error += "Invalid Hour: Enter numbers only\n";
		error_count++;
	}

	if (isNaN(parseInt(min)) || 60 <= min || min < 0){
		form.elements["min"].classList.add("error");
		error += "Invalid Minutes: Enter numbers between 0 and 59 only\n";
		error_count++;
	}

	if (isNaN(parseInt(sec)) ||  60 <= sec || sec < 0) {
		form.elements["sec"].classList.add("error");
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
	$('#post').show();
}

//resets the entire page
function reset() {
	
 	//dropdown.options.selectedIndex = 0;
	document.getElementById("pace_hrs").value = "";
	document.getElementById("pace_min").value = "";
	document.getElementById("pace_sec").value = "";
	form.elements["distance"].value = "";
	form.elements["hrs"].value = "";
	form.elements["min"].value = "";
	form.elements["sec"].value = "";
}

//main
function main() {
	calc.addEventListener("click", getInfo);
	resetter.addEventListener("click", reset);
}

main();
