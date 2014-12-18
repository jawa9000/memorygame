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
var gameStatus;

// button listener
$("div[id^='button']").click(function() {	
	fieldSize = $(this).attr("buttonData");
	//console.log("clicked id: " + $(this).attr("id"));
	//console.log("fieldSize: " + fieldSize);
	if (fieldSize == "2" || fieldSize == "3" || fieldSize == "4" || fieldSize == "5" || fieldSize == "6") { // start game
		//console.log("game field selected: " + fieldSize);
		gameStatus = "active";
		//console.log("menu button clicked");
		// get button data and set up dimensions of game
		//console.log("fieldSize: " + fieldSize);
		iconNum = (fieldSize * fieldSize) / 2; // value for number of icons to create
		//console.log("iconNum: " + iconNum);
		targetScore = Math.floor(fieldSize * fieldSize); // if score == targetScore, the current game has been won
		if (fieldSize == 3 || fieldSize == 5) {
			targetScore--;
		}
		//console.log("targetScore: " + targetScore);
		generateIcons(iconNum,targetScore,fieldSize); // generate icons
		// toggle game field and menu displays
		//console.log("fading in #gameField");
		$("#gameField").fadeIn("fast"); // show game field
		//console.log("slideing up #start");
		$("#start").slideUp("fast"); // hide buttons element
		//console.log("slideing down #inGameMenu");
		$("#inGameMenu").slideDown("fast"); // show menu element
	}
	//console.log("Game Status: " + gameStatus);
});
// game menu listener
$("#inGameMenu").click(function() {
	//console.log("fading in #question");
	$("#question").fadeIn("fast");
	//console.log("fading out #gameField");
	$("#gameField").fadeOut("fast");
	//console.log("sliding up #inGameMenu");
	$("#inGameMenu").slideUp("fast");
	gameStatus = "paused";
	//console.log("Game Status: " + gameStatus);
});
// menu button listener
$("div[id^='menu']").click(function() {
	var menuData = $(this).attr("menuData");
	//console.log("clicked id: " + $(this).attr("id"));
	//console.log("menuData: " + menuData);
	if (menuData == "reset") { // reset game
		//console.log("sliding down #start");
		$("#start").slideDown("fast"); // display buttons to select field size
		//console.log("sliding up #question");
		$("#question").slideUp("fast"); // hide question element for selecting reset or continue
		gameStatus = "reset";
		checkGameStatus(gameStatus);
	} else if (menuData == "continue") { // continue with current game
		//console.log("fading in #gameField");
		$("#gameField").fadeIn("fast"); // show game field
		//console.log("sliding up #start");
		$("#start").slideUp("fast"); // hide buttons element
		//console.log("sliding down #inGameMenu");
		$("#inGameMenu").slideDown("fast"); // show menu element
		//console.log("sliding up #question");
		$("#question").slideUp("fast");
		gameStatus = "active";
	}
});

checkGameStatus("start"); // display game field selection options and hide the game selectMenu button

// game field interactions
$(document).on("click",".gameCell",function() {
	if (!$(this).hasClass("glyphicon-star-empty")) { // if the clicked icon doesn't have the .glyphicon-star-empty class, assume clicked icon is clickable
		//console.log("clicked icon doesn't have glyphicon-star-empty class");
		//console.log("on icon click, fieldSize is: " + fieldSize);
		var clickedId = $(this).attr("id");
		//console.log("clickedId: " + clickedId);
		var clickedData = $(this).attr("data");
		//console.log("clickedData: " + clickedData);
		var clickedClass = $(this).attr("class");
		//console.log("clickedClass: " + clickedClass);
		//console.log("targetScore: " + targetScore);
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
		//console.log("clicks: " + clicks);
		if (clicks == 2) {
			clicksArray.push(clickedData);
			//console.log("clickedIdArray: " + clickedIdArray);
			//console.log(clickedIdArray[0][0] + "," + clickedIdArray[0][2]);
			//console.log(clickedIdArray[1][0] + "," + clickedIdArray[1][2]);
			if (clicksArray[0] == clicksArray[1] && clickedIdArray[0] != clickedIdArray[1]) { // clicked icons match and the same icon isn't clicked twice
				matched = true;
			//	console.log(clicksArray[0] + " = " + clicksArray[1]);
				// remove icon from game field
				class2DArray[parseInt(clickedIdArray[0][0])][parseInt(clickedIdArray[0][2])] = "noDisplay center-block glyphicon " + tempClassInsert + " glyphicon-" + data2DArray[parseInt(clickedIdArray[0][0])][parseInt(clickedIdArray[0][2])]; // replace gameCell with noDisplay class in class2DArray
				class2DArray[parseInt(clickedIdArray[1][0])][parseInt(clickedIdArray[1][2])] = "noDisplay center-block glyphicon " + tempClassInsert + " glyphicon-" + data2DArray[parseInt(clickedIdArray[1][0])][parseInt(clickedIdArray[1][2])]; // replace gameCell with noDisplay class in class2DArray
				//console.log(class2DArray);
				redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray);// redraw game field
				//console.log(class2DArray);
				score += 2;
				//console.log("score: " + score);
				$("#score").html(score);
				//console.log(score);
				// check if all icons have been matched
				if (score == targetScore) {
					//console.log("score: " + score);
					//gameTally += score;
					//score = 0;
					checkGameStatus("won"); // show game selectMenu; hide game field
					//console.log("You've won the game!");
				}
			} else {
				//console.log(clicksArray[0] + " != " + clicksArray[1]);
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
	} else {
		//console.log("clicked icon has glyphicon-star-empty class");
	}
});

// Utility functions
function checkGameStatus(gameStatus) {
	if (gameStatus == "start") { // show selectMenu options
		message = "Welcome to the Memory Game<br/>To start the game, click on one of these buttons";
		$("#message").html(message);
		// ** replace this function with a different one
		displayFieldButtons();
	} else if (gameStatus == "active") { // hide selectMenu options, show game field
		//$("#start").slideUp("fast");
		//console.log("gameStatus: " + gameStatus);
		//console.log("sliding down #inGameMenu");
		$("#inGameMenu").slideDown("fast");
		// show selectMenu options tab
	} else if (gameStatus == "won") {
		//console.log("run game won sequence to restart!");
		//console.log("fading out #field");
		$("#field").fadeOut("slow").delay(1000).html("");
		//console.log("sliding up #inGameMenu");
		$("#inGameMenu").slideUp("fast");
		//console.log("sliding down #start");
		$("#start").slideDown("fast");
		//console.log("score: " + score);
		//console.log("score: " + score + " == targetScore: " + targetScore);
		gameTally = gameTally + score; // add current game score to session score
		message = "You won!<br/>To play again, click on one of these buttons<br/>";
		message += "Your game score was " + score + " and your session score is " + gameTally;
		score = 0; // reset score
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
		$("#field").fadeIn("slow");
		//console.log("sliding up #inGameMenu");
		$("#inGameMenu").slideUp("fast");
		//console.log("sliding down #start");
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
		//console.log("iconNum: " + iconNum);
		//console.log("targetScore: " + targetScore);
		//console.log("fieldSize: " + fieldSize);
		//console.log("gameStatus: " + gameStatus);
		//console.log("iconTiles: " + iconTiles);
		//console.log("idArray: " + idArray);
		//console.log("dataArray: " + dataArray);
		//console.log("classArray: " + classArray);
		//console.log("id2DArray: " + id2DArray);
		//console.log("class2DArray: " + class2DArray);
		//console.log("data2DArray: " + data2DArray);
		//console.log("fadingout #field");
		//$("#field").fadeOut("slow").delay(1000).html("");
		$("#field").fadeIn("slow");
		//console.log("sliding up #inGameMenu");
		$("#inGameMenu").slideUp("fast");
		//console.log("sliding down #start");
		$("#start").slideDown("fast");
		
		generateIcons(iconNum,targetScore,fieldSize); // generate icons
	}
	//console.log("gameStatus: " + gameStatus);
}

function generateIcons(iconNum,targetScore,fieldSize,gameStatus) {
	//console.log("generateIcons function called.");
	// start populating arrays
	//console.log("fieldSize: " + fieldSize);
	//console.log("iconTiles: " + iconTiles);
	//console.log("idArray: " + idArray);
	//console.log("dataArray: " + dataArray);
	//console.log("classArray: " + classArray);
		
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
	//console.log("size of iconTiles:" + iconTiles.length);
	//console.log("final order (randomArray): " + randomArray);
	//console.log("size of randomArray: " + randomArray.length);
	// create id array
	idArray = [];
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
			idArray.push(i + "-" + j);
		}
	}
	//console.log("idArray: " + idArray);
	// create data array
	// ** this may get merged with iconTiles....
	dataArray = [];
	for (i in iconTiles) {
		dataArray.push(randomArray[i]);
	}
	//console.log("dataArray: " + dataArray);
	
	// create class array
	classArray = [];
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
	//console.log("class2DArray: " + class2DArray);
	generateField(fieldSize,id2DArray,class2DArray,data2DArray);
}

// ** this function should be removed
function displayFieldButtons() { // Display game field button options
	//console.log("sliding down #start");
	$("#start").slideDown("fast"); // display buttons to select field size
	//console.log("sliding up #question");
	$("#question").slideUp("fast"); // hide question element for selecting reset or continue
	//gameStatus = "reset";
}

function redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray) {
	//console.log("redrawGameField function called.");
	//console.log("fieldSize: " + fieldSize);
	//console.log("id2DArray: " + id2DArray);
	//console.log("class2DArray: " + class2DArray);
	//console.log("data2DArray: " + data2DArray);
	
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

	switch(fieldSize) { // based on fieldSize, insert a padding value on each .gameCell element to properly space each cell apart
		case "2":
			$(".gameCell").css("padding","2px 11px");
			break;
		case "3":
			$(".gameCell").css("padding","2px 12px");
			break;
		case "4":
			$(".gameCell").css("padding","2px 16px");
			break;
		case "5":
			$(".gameCell").css("padding","2px 22px");
			break;
		case "6":
			$(".gameCell").css("padding","2px 18px");
			break;
		default:
			$(".gameCell").css("padding","2px 22px"); // not a very good spacing but it's a fallback value
	}
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
	//console.log("class2DArray: " + class2DArray);
	redrawGameField(fieldSize,id2DArray,class2DArray,data2DArray);
}
