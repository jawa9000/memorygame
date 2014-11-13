var icons = ["asterisk","cloud","music","heart","star","user","home","file","lock","headphones","volume-up","book","camera","picture","tint","play","arrow-right","fire","eye-open","thumbs-up","globe","phone","floppy-disk","tower","tree-deciduous"]; // all possible icons
//var icons = ["cloud","cloud","heart","heart","star","star","home","home","lock","lock","volume-up","volume-up","camera","camera","tint","tint","fire","fire","eye-open","eye-open","globe","globe","floppy-disk","floppy-disk","tree-deciduous"]; // matching icons with one odd
var defaultIcon = "question-sign";

// Create buttons to select field size
var fields = ["2x2","3x3","4x4","5x5","6x6"];
var fieldMessage = "<div class='table'><div class='row'>";
for (var i = 0; i < fields.length; i++) {
	fieldMessage += "<div data='" + (i+2) + "' class='button' id='field" + i + "'>" + fields[i] + "</div>";
}
fieldMessage += "</div></div>";
$("#buttons").html(fieldMessage);

// Display field based on button clicked
$(".button").click(function() {
	var buttonValue = $(this).attr("data");
	/*
	var fieldSize = buttonValue * buttonValue;
	var iconSet;
	switch(parseInt(buttonValue)) { // based on the value of buttonValue, create a number that will be used to pair icons
		case 2:
			iconSet = 2; //2
			break;
		case 3:
			iconSet = Math.floor(Math.random() * 2) + 3; //3-4 icon sets
			break;
		case 4:
			iconSet = Math.floor(Math.random() * 5) + 4; //4-8 icon sets
			break;
		case 5:
			iconSet = Math.floor(Math.random() * 8) + 5; // 5-12 icon sets
			break;
		case 6:
			iconSet = Math.floor(Math.random() * 13) + 6; // 6-18 icons sets
			break;
	}
	*/
	// ** figure out what the difference is between buttonValue and iconSet
	// ** generate a list of icons based on the value of iconSet
	//console.log("iconSet: " + iconSet);
	//console.log("fields: " + (buttonValue * buttonValue));
	
	
	var randomTiles = [];
	
	/*
	// what if i used a 2d array; the size of the 2d array would depend on buttonValue
	var finalArray = [];
	
	for (var i = 0; i < buttonValue; i++) {
		var tempArray = [];
		for (var j = 0; j < buttonValue; j++) {
			var rndIcon = Math.floor(Math.random() * icons.length);
			tempArray.push(icons[rndIcon]);
		}
		finalArray.push(tempArray);
	}
	console.log(finalArray);
	*/
	
	// loop through buttonValue * buttonValue / 2
	// randomly pick an icon
	// push that random icon twice
	var loop = (buttonValue * buttonValue) / 2;
	// if (loop % 2) ....
	for (var i = 0; i < loop; i++) {
		var rndIcon = Math.floor(Math.random() * icons.length);
		randomTiles.push(icons[rndIcon]);
		randomTiles.push(icons[rndIcon]);
	}
	
	
	/*
	// based on buttonValue, generate a list of icons
	for (var i = 0; i < buttonValue; i++) {
		var rndIcon = Math.floor(Math.random() * icons.length);
		randomTiles.push(icons[rndIcon]);
	}
	*/
	
	/*
	// multiple the size of the randomTiles array by itself to get the correct number of icons
	var myLength = randomTiles.length;
	myLength = myLength * myLength;
	//console.log(myLength);
	for (var i = 0; i < myLength - 1; i++) {
		randomTiles.push(randomTiles[i]);
	}
	*/
	console.log(randomTiles);
	
	// randomize order of randomTiles
	var tempArray = []; // array to hold a copy of randomTiles
	var randomArray = []; // array to hold randomly ordered version of randomTiles
	for (i in randomTiles) { // copy randomTiles to tempArray
	 	tempArray.push(randomTiles[i]);
	}
	for (var i = 0; i < randomTiles.length; i++) {
		if (tempArray.length > 0) {
			var rnd = Math.floor(Math.random() * (tempArray.length - 1));
			randomArray.push(tempArray[rnd]);
			tempArray.splice(rnd, 1);
	 	}
	}
	//console.log("original order (randomTiles): " + randomTiles);
	//console.log("final order (randomArray): " + randomArray);
	
	// build field with icons
	var tempCount = 0;
	var field = "<div class='table'>";
	for (var i = 0; i < buttonValue; i++) {
	 	field += "<div class='row' id=fieldRow" + i + ">";
	 	for (var j = 0; j < buttonValue; j++) {
	 		//console.log(randomArray[tempCount]);
	 		//field += "<div data='" + randomTiles[tempCount] + "' class='cell glyphicon glyphicon-" + defaultIcon + "' id='fieldCell" + i + "-" + j + "'></div>";
	 		field += "<div data='" + randomTiles[tempCount] + "' class='cell glyphicon glyphicon-" + randomArray[tempCount] + "' id='fieldCell" + i + "-" + j + "'></div>";
	 		tempCount++;
	 	}
	 	field += "</div>";
	}
	field += "</div>";
	$("#field").html(field);
});


/*
 * $(".button").click(function() {

	randomizeArray(iconSet,randomTiles);
	
	// generate field based on button click
	var tempCount = 0;
	var field = "<div class='table'>";
	for (var i = 0; i < iconSet; i++) {
	 	field += "<div class='row' id=fieldRow" + i + ">";
	 	for (var j = 0; j < iconSet; j++) {
	 		field += "<div class='cell' id='fieldCell" + i + "-" + j + "'>" + randomTiles[tempCount] + "</div>";
	 		tempCount++;
	 	}
	 	field += "</div>";
	}
	field += "</div>";
	$("#field").html(field);	
	// end field generation 
});
 */

/*
var count = 0; // generic number to iterate through icon array when drawing the board
var boardSize = 5; // number of rows and columns to create for the board
var clicks = 0; // count the number of times the user clicks
var clicksArray = []; // store the clicked icon's data

// create board
var message ="<div class='table'>";
for (var i = 0; i < boardSize; i++) {
	message += "<div class='row'>";
	for (var j = 0; j < boardSize; j++) {
		message += "<div id='container-" + i + "-" + j + "' class='container'>";
		message += "<div id='cell-" + i + "-" + j + "' data='" + icons[count] + "' class='cell glyphicon glyphicon-" + defaultIcon + "'></div>";
		message += "</div>";
		count++;
	}
	message += "</div>";
}
message += "</div>";
$("#output").html(message);
// end board creation

$(document).ready(function() {
	$(".cell").click(function() {
		var iconData = $(this).attr("data"); // get data
		clicks++;
		// check to see if both clicked items match
		if (clicksArray[0] == clicksArray[1]) { // ** work on this so it needs require a third click to act **
			console.log("you found a match");
		}
		if (clicksArray.length == 2) { // if the user has clicked twice
			console.log("third click, hide all");
			$(".cell").removeClass("glyphicon-" + clicksArray[0]).removeClass("glyphicon").removeClass("cell"); // remove all classes
			$(".cell").removeClass("glyphicon-" + clicksArray[1]).removeClass("glyphicon").removeClass("cell"); // remove all classes
			for (var i = 0; i < boardSize; i++) { // reset classes
				for (var j = 0; j < boardSize; j++) {
					$("#cell-" + i + "-" + j).attr("class","cell glyphicon glyphicon-" + defaultIcon); // this forces the order of the classes to the proper order.
				}
			}
			clicks = 0;
			clicksArray = []; // empty clicks array
			clicksArray.push(iconData); // populate clicks array with current click
			console.log(clicksArray);
		} else { // user hasn't clicked twice yet
			clicksArray.push(iconData);
			console.log(clicksArray);
		}		
		// this works nicely but it doesn't have a tranistion
		if ($(this).hasClass("glyphicon glyphicon-" + defaultIcon)) { // if the clicked icon is the question mark, replace it with data's icon
			$(this).removeClass("glyphicon glyphicon-" + defaultIcon);
			$(this).addClass("glyphicon glyphicon-" + iconData);
		} else { // otherwise, replace data's icon with question mark
			$(this).removeClass("glyphicon glyphicon-" + iconData);
			$(this).addClass("glyphicon glyphicon-" + defaultIcon);
		}
		console.log(iconData);
	});
});

// fields and ramdonly picked cell values





function buildArray(size,array) {
	console.log("buildArray function: size: " + size);
	console.log("buildArray function: array: " + array);
	for (var i = 0; i < size * size; i++) {
		var ranNum = Math.floor(Math.random() * 20); // there are up to 6 different icons to choose from
		array.push(ranNum);
	}
}
function removeDups(size,array) {
 	for (var i = 0; i < size; i++) {
	 	var a = i;
	 	var b = a + 1;
	 	if (b > size - 1) {
	 		b = b - size;
	 	}
	 	var c = b + 1;
	 	if (c > size - 1) {
	 		c = c - size;
	 	}
	 	var d = c + 1;
	 	if (d > size - 1) {
	 		d = d - size;
	 	}
	 	var e = d + 1;
	 	if (e > size - 1) {
	 		e = e - size;
	 	}
	 	var f = e + 1;
	 	if (f > size - 1) {
	 		f = f - size;
	 	}
	 	
	 	//console.log("a:" + a + " b:" + b + " c:" + c + " d:" + d + " e:" + e);
		switch (size) {
		 	case 2:
			 	if (array[a] == array[b]) {
			 		while(array[a] == array[b]) {
			 			if (array[a] + 1 < 20) {
			 				array[a]++;
			 			}
			 		}
			 	}
		 		break;
		 	case 3:
			 	if (array[a] == array[b] || array[a] == array[c]) {
			 		while(array[a] == array[b] || array[a] == array[c]) {
			 			if (array[a] + 1 < 20) {
			 				array[a]++;
			 			}
			 		}
			 	}
		 		break;
		 	case 4:
		 		if (array[a] == array[b] || array[a] == array[c] || array[a] == array[d]) {
			 		while(array[a] == array[b] || array[a] == array[c] || array[a] == array[d]) {
			 			if (array[a] + 1 < 20) {
			 				array[a]++;
			 			}
			 		}
			 	}
		 		break;
		 	case 5:
		 		if (array[a] == array[b] || array[a] == array[c] || array[a] == array[d] || array[a] == array[e]) {
			 		while(array[a] == array[b] || array[a] == array[c] || array[a] == array[d] || array[a] == array[e]) {
			 			if (array[a] + 1 < 20) {
			 				array[a]++;
			 			}
			 		}
			 	}
		 		break;
		 	case 6:
		 		if (array[a] == array[b] || array[a] == array[c] || array[a] == array[d] || array[a] == array[e] || array[a] == array[f]) {
			 		while(array[a] == array[b] || array[a] == array[c] || array[a] == array[d] || array[a] == array[e] || array[a] == array[f]) {
			 			if (array[a] + 1 < 20) {
			 				array[a]++;
			 			}
			 		}
			 	}
		 		break;
		 }
 	}
 	
 	// ** needs a step to take the first half of the array, and duplicate it so the field can have matching items **
 	console.log("array before the cut: " + array);
 	var tempArray = [];
 	for (var i = 0; i < (array.length / 2); i++) {
		tempArray.push(array[i]);
		tempArray.push(array[i]);
 	}
 	tempArray.pop();
 	console.log("array with single dups: " + tempArray);
 	console.log("array length: " + tempArray.length);
 	
 	array = [];
 	for (i in tempArray) {
 		array.push(tempArray[i]);
 	}
 	
 	// ** this works for going through the array and making a set of matching items. However, the rest of this function prohibits duplicates from happening.
 	// ** adjust this script
}
	 
function randomizeArray(size,array) {
	var tempArray = []; // array to hold a copy of randomTiles
	var randomArray = []; // array to hold randomly ordered version of randomTiles
	for (i in array) { // copy randomTiles to tempArray
	 	tempArray.push(array[i]);
	}
	for (var i = 0; i < size; i++) {
		if (tempArray.length > 0) {
			var rnd = Math.floor(Math.random() * (tempArray.length - 1));
			randomArray.push(tempArray[rnd]);
			tempArray.splice(rnd, 1);
	 	}
	}
	console.log("original order: " + array);
	console.log("final order: " + randomArray);
}
*/
