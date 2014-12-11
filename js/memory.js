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
var fields = ["2x2","3x3","4x4","5x5","6x6"]; // game field sizes
var message = ""; // variable to hold game status message(s)
var count = 0; // generic number to iterate through icon array when drawing the board
var clicks = 0; // count the number of times the user clicks
var clicksArray = []; // store the clicked icon's data
var clickedIdArray = []; // store the cliked icon's id
var score = 0; // store score for current game
var gameTally = 0; // store total score for all games played this session
var matched = false; // boolean value if the icons match or not

checkGameStatus("start"); // display game field selection options and hide the game selectMenu button

// Display field based on button clicked
$(".button").click(function() {
	checkGameStatus("active"); // hide selectMenu section
	fieldSize = $(this).attr("data"); // get value to be used for fieldSize
	//console.log("fieldSize: " + fieldSize);
	iconNum = (fieldSize * fieldSize) / 2; // value for number of icons to create
	//console.log("iconNum: " + iconNum);
	targetScore = Math.floor(fieldSize * fieldSize);
	
	// start populating arrays	
	iconTiles = []; // empty icon array	
	if (iconNum % 2) { // if iconNum is odd, subject one and push the 'empty tile' icon into the array
		iconNum--;
		iconTiles.push("star-empty"); // this tile doesn't have a match
		targetScore--;
	}
	//console.log(targetScore);
	for (var i = 0; i < iconNum; i++) { // pick a pair of icons and push into array
		var rndIcon = Math.floor(Math.random() * icons.length);
		iconTiles.push(icons[rndIcon]);
		iconTiles.push(icons[rndIcon]);
	}
	//console.log("iconTiles array: " + iconTiles);
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
	//console.log("original order (iconTiles): " + iconTiles);
	//console.log("final order (randomArray): " + randomArray);
	
	// create id array
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
			idArray.push(i + "-" + j);
		}
	}
	//console.log("idArray: " + idArray);
	
	// create data array
	// ** this may get merged with iconTiles....
	for (i in iconTiles) {
		dataArray.push(randomArray[i]);
	}
	//console.log("dataArray: " + dataArray);
	
	// create class array
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
			classArray.push("gameCell center-block glyphicon");
		}
	}
	//console.log("classArray: " + classArray);
	// set up various 1d arrays into 2d arrays
	convertArray(idArray,id2DArray,fieldSize);
	convertArray(dataArray,data2DArray,fieldSize);
	convertArray(classArray,class2DArray,fieldSize);
	
	generateField(fieldSize,id2DArray,class2DArray,data2DArray);
});

// selectMenu interactions
$("#inGameMenu").click(function() {
	$("#inGameMenu").slideUp("fast").css("display","none");
	$("#selectMenu").slideDown("fast");
	// ** insert game field reset here!!! **
});


// game field interactions
$(document).on("click",".gameCell",function() {
	//console.log("on icon click, fieldSize is: " + fieldSize);
	var clickedId = $(this).attr("id");
	//console.log("clickedId: " + clickedId);
	var clickedData = $(this).attr("data");
	//console.log("clickedData: " + clickedData);
	var clickedClass = $(this).attr("class");
	//console.log("clickedClass: " + clickedClass);
	
	clickedIdArray.push(clickedId);
	//console.log("clickedIdArray: " + clickedIdArray);
	if ($(this).hasClass("gameCell")) {
		var first = parseInt(clickedId.substr(0,1)); // with id, find value for first place in data2DArray
		var second = parseInt(clickedId.substr(2,3)); // with id, find value for second place in data2Darray
		// reset for column size
		var tempClassInsert = "";
		if (fieldSize == 2) { // col-md-6
			tempClassInsert += " col-md-6 ";
		} else if (fieldSize == 3) { //col-md-4
			tempClassInsert += " col-md-4 ";
		} else if (fieldSize == 4) { //col-md-3
			tempClassInsert += " col-md-3 ";
		} else if (fieldSize == 5 || fieldSize == 6) { //col-md-2
			tempClassInsert = " col-md-2 ";
		}
		class2DArray[first][second] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-" + data2DArray[first][second]; // replace class array data with data2DArray value and update col-md class
		//console.log(fieldSize);		
		redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray);// redraw game field
	}
	clicks++;
	console.log("clicks: " + clicks);
	if (clicks == 2) {
		clicksArray.push(clickedData);
		console.log("clickedIdArray: " + clickedIdArray);
		//console.log(clickedIdArray[0][0] + "," + clickedIdArray[0][2]);
		//console.log(clickedIdArray[1][0] + "," + clickedIdArray[1][2]);
		if (clicksArray[0] == clicksArray[1] && clickedIdArray[0] != clickedIdArray[1]) { // clicked icons match and the same icon isn't clicked twice
			matched = true;
			console.log(clicksArray[0] + " = " + clicksArray[1]);
			// remove icon from game field
			class2DArray[parseInt(clickedIdArray[0][0])][parseInt(clickedIdArray[0][2])] = "noDisplay center-block glyphicon " + tempClassInsert + " glyphicon-" + data2DArray[parseInt(clickedIdArray[0][0])][parseInt(clickedIdArray[0][2])]; // replace gameCell with noDisplay class in class2DArray
			class2DArray[parseInt(clickedIdArray[1][0])][parseInt(clickedIdArray[1][2])] = "noDisplay center-block glyphicon " + tempClassInsert + " glyphicon-" + data2DArray[parseInt(clickedIdArray[1][0])][parseInt(clickedIdArray[1][2])]; // replace gameCell with noDisplay class in class2DArray
			console.log(class2DArray);
			redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray);// redraw game field
			console.log(class2DArray);
			score += 2;
			$("#score").html(score);
			console.log(score);
			// check if all icons have been matched
			if (score == targetScore) {
				console.log("You've won the game!");
				gameTally += score;
				// show game selectMenu; hide game field
				$("#tally").html(gameTally);
			}
		} else {
			console.log(clicksArray[0] + " != " + clicksArray[1]);
			matched = false;
		}
	} else if (clicks == 3) {
		//console.log(class2DArray);
		if (!matched) {
			class2DArray[parseInt(clickedIdArray[0][0])][parseInt(clickedIdArray[0][2])] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-question-sign"; // reset class2DArray
			class2DArray[parseInt(clickedIdArray[1][0])][parseInt(clickedIdArray[1][2])] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-question-sign"; // reset class2DArray
			matched = false;
		}
		//console.log(class2DArray);
		class2DArray[first][second] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-" + data2DArray[first][second];		
		redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray);// redraw game field
		// resets
		clicksArray = [];
		clickedIdArray = [];
		clickedIdArray.push(clickedId);
		clicksArray.push(clickedData);
		clicks = 1;
	} else {
		clicksArray.push(clickedData);
	}
});

// Utility functions
function checkGameStatus(gameStatus) {
	if (gameStatus == "start") { // show selectMenu options
		message = "Welcome to the Memory game<br/>To start the game, clicked on one of these buttons";
		$("#message").html(message);
		buildFieldButtons();
	} else if (gameStatus == "active") { // hide selectMenu options, show game field
		//$("#selectMenu").slideUp("fast").delay(10500);
		$("#selectMenu").slideUp("fast");
		$("#inGameMenu").css("display","block").slideDown("fast");
		// show selectMenu options tab
	} else if (gameStatus == "won") {
		$("#inGameMenu").slideUp("fast");
		// show selectMenu options
		buildFieldButtons();
		// display "you've won" message
		message = "You won!<br/>To play again, click on one of these buttons";
		$("#message").html(message);
	}
	//console.log("gameStatus: " + gameStatus);
}

function buildFieldButtons() { // Create buttons to select field size
	var fieldMessage = "<div class='gameTable'><div class='gameRow'>";
	for (var i = 0; i < fields.length; i++) {
		fieldMessage += "<div data='" + (i+2) + "' class='button' id='field" + i + "'>" + fields[i] + "</div>";
	}
	fieldMessage += "</div></div>";
	$("#buttons").html(fieldMessage);
}

function redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray) {
	var message = "<div class='gameRow'>";
	message += "<div class='col-md-2'></div>"; // left side
	message += "<div class='col-md-8'>"; // start of center
	for (var i = 0; i < fieldSize; i++) {
	message += "<div class='gameRow'>";
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
	message += "<div class='col-md-2'></div></div>"; // right side and end of row
	message += "</div>"; // end of center
	$("#field").html(message);
}

function convertArray(array1d,array2d,fieldSize) {
	//console.log("setting up " + array1d + " to become a 2d array");
	//console.log("executing converArray function. fieldSize = " + fieldSize);
	var count = 0;
	for (var i = 0; i < fieldSize; i++) {
		var tempArray = [];
		for (var j = 0; j < fieldSize; j++) {
			tempArray.push(array1d[count]);
			count++;
		}
		array2d.push(tempArray);
	}
	//console.log(array2d);
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
	
	redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray);
	//fieldSize = 0;
	//id2DArray = [];
	//class2DArray = [];
	//data2DArray = [];
}




/*
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
*/
