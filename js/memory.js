//var defaultIcon = "question-sign";

var idArray = []; // 1d array of all ids on game field elements
var dataArray = []; // 1d array of all data values of game field elements
var classArray = []; // 1d array of all classes of game field elements
var id2DArray = []; // 2d array converted from 1d array of ids
var class2DArray = []; // 2d array converted from 1d array of class
var data2DArray = []; // 2d array converted from 1d array of data
var iconTiles = []; // array to hold a list of icons to be display on the game field
var icons = ["asterisk","cloud","music","heart","star","user","home","file","lock","headphones","volume-up","book","camera","picture","tint","play","arrow-right","fire","eye-open","thumbs-up","globe","phone","floppy-disk","tower","tree-deciduous"]; // all possible icons
var iconNum = 0; // number of icons to generate
var fieldSize = 0; // size of game field


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
	var fieldSize = $(this).attr("data"); // get value to be used for fieldSize
	console.log("fieldSize: " + fieldSize);
	iconNum = (fieldSize * fieldSize) / 2; // value for number of icons to create
	console.log("iconNum: " + iconNum);

	// start populating arrays	
	iconTiles = []; // empty icon array	
	if (iconNum % 2) { // if iconNum is odd, subject one and push the 'empty tile' icon into the array
		iconNum--;
		iconTiles.push("star-empty"); // this tile doesn't have a match
	}
	for (var i = 0; i < iconNum; i++) { // pick a pair of icons and push into array
		var rndIcon = Math.floor(Math.random() * icons.length);
		iconTiles.push(icons[rndIcon]);
		iconTiles.push(icons[rndIcon]);
	}
	console.log("iconTiles array: " + iconTiles);
	
	// randomize order of iconTiles
	var tempArray = []; // array to hold a copy of randomTiles
	var randomArray = []; // array to hold randomly ordered version of randomTiles
	for (i in iconTiles) { // copy randomTiles to tempArray
	 	tempArray.push(iconTiles[i]);
	}
	for (var i = 0; i < iconTiles.length; i++) {
		if (tempArray.length > 0) {
			var rnd = Math.floor(Math.random() * (tempArray.length - 1));
			randomArray.push(tempArray[rnd]);
			tempArray.splice(rnd, 1);
	 	}
	}
	console.log("original order (iconTiles): " + iconTiles);
	console.log("final order (randomArray): " + randomArray);
	
	// create id array
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
			idArray.push(i + "-" + j);
		}
	}
	console.log("idArray: " + idArray);
	
	// create data array
	// ** this may get merged with iconTiles....
	for (i in iconTiles) {
		dataArray.push(randomArray[i]);
	}
	console.log("dataArray: " + dataArray);
	
	// create class array
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
			classArray.push("cell center-block glyphicon");
		}
	}
	console.log("classArray: " + classArray);
	
	// set up various 1d arrays into 2d arrays
	convertArray(idArray,id2DArray,fieldSize);
	convertArray(dataArray,data2DArray,fieldSize);
	convertArray(classArray,class2DArray,fieldSize);
	
	generateField(fieldSize,id2DArray,class2DArray,data2DArray);
});

// Utility functions
function convertArray(array1d,array2d,fieldSize) {
	//console.log("setting up " + array1d + " to become a 2d array");
	console.log("executing converArray function. fieldSize = " + fieldSize);
	var count = 0;
	for (var i = 0; i < fieldSize; i++) {
		var tempArray = [];
		for (var j = 0; j < fieldSize; j++) {
			tempArray.push(array1d[count]);
			count++;
		}
		array2d.push(tempArray);
	}
	console.log(array2d);
}

function generateField(fieldSize,id2DArray,class2DArray,data2DArray) { // generate game field and display it
	// update class2DArray
	// ** note: there is an issue that if the select field size button is clicked before the game is finished, 
	// ** the following will append to the class array and mess up the display of the game field. This should not be a problem
	// ** as the select field size buttons will be hidden during game play.
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
			if (fieldSize == 2) { // col-md-6
				class2DArray[i][j] += " col-md-6 ";
			} else if (fieldSize == 3) { //col-md-4
				class2DArray[i][j] += " col-md-4 ";
			} else if (fieldSize == 4) { //col-md-3
				class2DArray[i][j] += " col-md-3 ";
			} else if (fieldSize == 5 || fieldSize == 6) { //col-md-2
				class2DArray[i][j] += " col-md-2 ";
			}
			if (data2DArray[i][j] == "star-empty") {
				class2DArray[i][j] += " glyphicon-star-empty ";
			} else {
				class2DArray[i][j] += " glyphicon-question-sign ";
			}
		}
	}
	
	//set up outer elements
	var message = "<div class='row'>";
	message += "<div class='col-md-2'></div>"; // left side
	message += "<div class='col-md-8'>"; // start of center
	for (var i = 0; i < fieldSize; i++) {
		message += "<div class='row'>";
			if (fieldSize == 5) {
				message += "<div class='col-md-1'></div>";
			}
		for (var j = 0; j < fieldSize; j++) {
			message += "<div id='" + id2DArray[i][j] + "' class='" + class2DArray[i][j] + "' data='" + data2DArray[i][j] + "'></div>";
		}
		if (fieldSize == 5) {
			message += "<div class='col-md-1'></div>";
		}
		message += "</div>";
	}
	message += "</div>";
	// finish up outer elements
	message += "</div>"; // end of center
	message += "<div class='col-md-2'></div></div>"; // right side and end of row
	$("#field").html(message);
	fieldSize = 0;
	id2DArray = [];
	class2DArray = [];
	data2DArray = [];
}


/*
// Display field based on button clicked
$(".button").click(function() {
	var buttonValue = $(this).attr("data");
	var randomTiles = [];

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
