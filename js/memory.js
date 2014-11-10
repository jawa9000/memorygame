//var icons = ["asterisk","cloud","music","heart","star","user","home","file","lock","headphones","volume-up","book","camera","picture","tint","play","arrow-right","fire","eye-open","thumbs-up","globe","phone","floppy-disk","tower","tree-deciduous"]; // all possible icons
var icons = ["cloud","cloud","heart","heart","star","star","home","home","lock","lock","volume-up","volume-up","camera","camera","tint","tint","fire","fire","eye-open","eye-open","globe","globe","floppy-disk","floppy-disk","tree-deciduous"]; // matching icons with one odd
var defaultIcon = "question-sign";

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

var fields = ["2x2","3x3","4x4","5x5","6x6"];
var fieldMessage = "<div class='table'><div class='row'>";
for (var i = 0; i < fields.length; i++) {
	fieldMessage += "<div class='button' id='field" + i + "'>" + fields[i] + "</div>";
}
fieldMessage += "</div></div>";
$("#buttons").html(fieldMessage);

$(".button").click(function() {
	var buttonValue = $(this).attr("id");
	var fieldSize = parseInt(buttonValue.slice(5,6)) + 2;
	var randomTiles = [];
	
	buildArray(fieldSize,randomTiles);
	console.log("randomTiles: " + randomTiles);
	 
	removeDups(fieldSize,randomTiles);
	console.log("adjusted: " + randomTiles);
	 
	// for each row, randomly pick a values from randomTiles and display it
	randomizeArray(fieldSize,randomTiles);
	
	// generate field based on button click
	var tempCount = 0;
	var field = "<div class='table'>";
	for (var i = 0; i < fieldSize; i++) {
	 	field += "<div class='row' id=fieldRow" + i + ">";
	 	for (var j = 0; j < fieldSize; j++) {
	 		field += "<div class='cell' id='fieldCell" + i + "-" + j + "'>" + randomTiles[tempCount] + "</div>";
	 		tempCount++;
	 	}
	 	field += "</div>";
	}
	field += "</div>";
	$("#field").html(field);	
	// end field generation 
});

function buildArray(size,array) { // ** this needs to be a 2d array, not 1d **
	for (var i = 0; i < size; i++) {
		var ranNum = Math.floor(Math.random() * 20); // there are up to 6 different icons to choose from
		array.push(ranNum);
	}
}
function removeDups(size,array) { // ** this needs to be able to read a 2d array **
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
}
	 
function randomizeArray(size,array) { // ** this nneds to handle a 2d array **
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

