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
var gameStatus;

// button listener
$("button[id^='button']").click(function() {	
	fieldSize = $(this).attr("buttonData");
	if (fieldSize == "2" || fieldSize == "3" || fieldSize == "4" || fieldSize == "5" || fieldSize == "6") { // start game
		gameStatus = "active";
		// get button data and set up dimensions of game
		iconNum = (fieldSize * fieldSize) / 2; // value for number of icons to create
		targetScore = Math.floor(fieldSize * fieldSize); // if score == targetScore, the current game has been won
		if (fieldSize == 3 || fieldSize == 5) {
			targetScore--;
		}
		generateIcons(iconNum,targetScore,fieldSize); // generate icons
		// toggle game field and menu displays
		$("#gameField").slideDown("fast"); // show game field
		$("#start").slideUp("fast"); // hide buttons element
		$("#inGameMenu").slideDown("fast"); // show menu element
		$("#score").slideDown("fast"); // show scores
	}
});

// game menu listener
$("#inGameMenu").click(function() {
	$("#question").slideDown("fast");
	$("#gameField").slideUp("fast");
	$("#inGameMenu").slideUp("fast");
	$("#score").slideUp("fast"); // hide scores
	gameStatus = "paused";
});

// menu button listener
$("button[id^='menu']").click(function() {
	var menuData = $(this).attr("menuData");
	if (menuData == "reset") { // reset game
		$("#start").slideDown("fast"); // display buttons to select field size
		$("#question").slideUp("fast"); // hide question element for selecting reset or continue
		$("#score").slideUp("fast"); // hide scores
		gameStatus = "reset";
		checkGameStatus(gameStatus);
	} else if (menuData == "continue") { // continue with current game
		$("#gameField").slideDown("fast"); // show game field
		$("#start").slideUp("fast"); // hide buttons element
		$("#inGameMenu").slideDown("fast"); // show menu element
		$("#score").slideDown("fast"); // show scores
		$("#question").slideUp("fast");
		gameStatus = "active";
	}
});

checkGameStatus("start"); // display game field selection options and hide the game selectMenu button

// game field interactions
$(document).on("click",".gameCell",function() {
	if (!$(this).hasClass("glyphicon-star-empty")) { // if the clicked icon doesn't have the .glyphicon-star-empty class, assume clicked icon is clickable
		var clickedId = $(this).attr("id");
		var clickedData = $(this).attr("data");
		var clickedClass = $(this).attr("class");
		clickedIdArray.push(clickedId);
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
			redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray);// redraw game field
		}
		clicks++;
		if (clicks == 2) {
			clicksArray.push(clickedData);
			if (clicksArray[0] == clicksArray[1] && clickedIdArray[0] != clickedIdArray[1]) { // clicked icons match and the same icon isn't clicked twice
				matched = true;
				// remove icon from game field
				class2DArray[parseInt(clickedIdArray[0][0])][parseInt(clickedIdArray[0][2])] = "noDisplay center-block glyphicon " + tempClassInsert + " glyphicon-" + data2DArray[parseInt(clickedIdArray[0][0])][parseInt(clickedIdArray[0][2])]; // replace gameCell with noDisplay class in class2DArray
				class2DArray[parseInt(clickedIdArray[1][0])][parseInt(clickedIdArray[1][2])] = "noDisplay center-block glyphicon " + tempClassInsert + " glyphicon-" + data2DArray[parseInt(clickedIdArray[1][0])][parseInt(clickedIdArray[1][2])]; // replace gameCell with noDisplay class in class2DArray
				redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray);// redraw game field
				score += 2;
				$("#gameScore").html("score: " + score);
				// check if all icons have been matched
				if (score == targetScore) {
					checkGameStatus("won"); // show game selectMenu; hide game field
				}
			} else {
				matched = false;
			}
		} else if (clicks == 3) {
			if (!matched) {
				class2DArray[parseInt(clickedIdArray[0][0])][parseInt(clickedIdArray[0][2])] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-question-sign"; // reset class2DArray
				class2DArray[parseInt(clickedIdArray[1][0])][parseInt(clickedIdArray[1][2])] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-question-sign"; // reset class2DArray
				matched = false;
			}
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
	}
});

// Utility functions
function checkGameStatus(gameStatus) {
	if (gameStatus == "start") { // show selectMenu options
		message = "Welcome to the Memory Game<br/>To start the game, click on one of these buttons";
		$("#message").html(message);
		$("#score").slideUp("fast");
		displayFieldButtons();
	} else if (gameStatus == "active") { // hide selectMenu options, show game field
		$("#start").slideUp("fast");
		$("#inGameMenu").slideDown("fast");
		$("#score").slideDown("fast");
		$("#gameScore").html("score: " + score);
		$("#sessionScore").html("session: " + gameTally);
	} else if (gameStatus == "won") { // show selectMenu options tab
		$("#field").slideUp("slow").html("");
		$("#inGameMenu").slideUp("fast");
		$("#score").slideUp("fast");
		$("#start").slideDown("fast");
		gameTally = gameTally + score; // add current game score to session score
		$("#sessionScore").html("session: " + gameTally);
		message = "You won!<br/>To play again, click on one of these buttons<br/>";
		message += "Your game score was " + score + " and your session score is " + gameTally;
		score = 0; // reset score
		$("#gameScore").html("score: " + score);
		gameStatus = "start";
		$("#message").html(message); // display "you've won" message
		iconNum = 0;
		targetScore = 0;
		fieldSize = 0;
		iconTiles = [];
		idArray = [];
		dataArray = [];
		classArray = [];
		id2DArray = [];
		class2DArray = [];
		data2DArray = [];
		$("#field").slideDown("slow");
		$("#inGameMenu").slideUp("fast");
		$("#start").slideDown("fast");
		generateIcons(iconNum,targetScore,fieldSize); // generate icons
	} else if (gameStatus == "reset") {
		iconNum = 0;
		targetScore = 0;
		fieldSize = 0;
		iconTiles = [];
		idArray = [];
		dataArray = [];
		classArray = [];
		id2DArray = [];
		class2DArray = [];
		data2DArray = [];
		$("#field").slideDown("slow").html("");
		$("#inGameMenu").slideUp("fast");
		$("#score").slideUp("fast");
		$("#start").slideDown("fast");
		$("#message").text("Game Reset");
		generateIcons(iconNum,targetScore,fieldSize); // generate icons
	}
}

function generateIcons(iconNum,targetScore,fieldSize,gameStatus) {
	// start populating arrays
	iconTiles = []; // empty icon array	
	if (iconNum % 2) { // if iconNum is odd, subject one and push the 'empty tile' icon into the array
		iconNum--;
		iconTiles.push("star-empty"); // this tile doesn't have a match
		targetScore--;
	}
	for (var i = 0; i < iconNum; i++) { // pick a pair of icons and push into array
		var rndIcon = Math.floor(Math.random() * icons.length);
		iconTiles.push(icons[rndIcon]);
		iconTiles.push(icons[rndIcon]);
	}
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
	// create id array
	idArray = [];
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
			idArray.push(i + "-" + j);
		}
	}
	dataArray = [];
	for (i in iconTiles) {
		dataArray.push(randomArray[i]);
	}
	// create class array
	classArray = [];
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
			classArray.push("gameCell center-block glyphicon");
		}
	}
	// set up various 1d arrays into 2d arrays
	convertArray(idArray,id2DArray,fieldSize);
	convertArray(dataArray,data2DArray,fieldSize);
	convertArray(classArray,class2DArray,fieldSize);
	generateField(fieldSize,id2DArray,class2DArray,data2DArray);
}

function displayFieldButtons() { // Display game field button options
	$("#start").slideDown("fast"); // display buttons to select field size
	$("#question").slideUp("fast"); // hide question element for selecting reset or continue
	$("#gameScore").html("score: " + score);
	$("#sessionScore").html("session: " + gameTally);
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
	var count = 0;
	for (var i = 0; i < fieldSize; i++) {
		var tempArray = [];
		for (var j = 0; j < fieldSize; j++) {
			tempArray.push(array1d[count]);
			count++;
		}
		array2d.push(tempArray);
	}
}

function generateField(fieldSize,id2DArray,class2DArray,data2DArray) { // generate game field and display it
	// update class2DArray
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
}
