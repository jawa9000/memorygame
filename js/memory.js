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
