var date = new Date();
var fullYear = date.getFullYear();
var copyrightMessage ="&copy; " + fullYear + ", Brian Immel";

document.getElementById("copyright").innerHTML = copyrightMessage;
