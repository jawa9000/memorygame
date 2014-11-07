var icons = ["asterisk","cloud","music","heart","star","user","home","file","lock","headphones","volume-up","book","camera","picture","tint","play","arrow-right","fire","eye-open","thumbs-up","globe","phone","floppy-disk","tower","tree-deciduous"];
var defaultIcon = "question-sign";

var count = 0;
var message ="<div class='table'>";
for (var i = 0; i < 5; i++) {
	message += "<div class='row'>";
	for (var j = 0; j < 5; j++) {
		message += "<div id='" + i + "-" + j + "' data='" + icons[count] + "' class='cell glyphicon glyphicon-" + defaultIcon + "'></div>";
		count++;
	}
	message += "</div>";
}
message += "</div>";
message += "<div class = 'glyphicon glyphicon-" + defaultIcon + "'>default icon</div>";
$("#output").html(message);

var clicks = 0;
var tempArray = [];

$(document).ready(function() {
	$(".cell").click(function() {
		var iconData = $(this).attr("data"); // get data
		clicks++;
		if (tempArray.length == 2) {
			console.log("third click, hide all");
			$(".cell").removeClass("glyphicon-" + tempArray[0]).removeClass("glyphicon").removeClass("cell");
			$(".cell").removeClass("glyphicon-" + tempArray[1]).removeClass("glyphicon").removeClass("cell");
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 5; j++) {
					$("#" + i + "-" + j).attr("class","cell glyphicon glyphicon-" + defaultIcon); // this forces the order of the classes to the proper order.
				}
			}
			clicks = 0;
			tempArray = [];
			tempArray.push(iconData);
			console.log(tempArray);
		} else {
			tempArray.push(iconData);
			console.log(tempArray);
		}
		
		if ($(this).hasClass("glyphicon glyphicon-" + defaultIcon)) { // if the clicked icon is the question mark, replace it with data's icon
			$(this).removeClass("glyphicon glyphicon-" + defaultIcon);
			$(this).addClass("glyphicon glyphicon-" + iconData);
	} else { // otherwise, replace data's icon with question mark
			$(this).removeClass("glyphicon glyphicon-" + iconData);
			$(this).addClass("glyphicon glyphicon-" + defaultIcon);
		}
		console.log(iconData);
	});
	// count two clicks. If clicks = 2, then hide all icons
});
