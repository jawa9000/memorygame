/*
 * Purpose: To create a re-usable navigation bar so I don't have to maintain it on every single page in my site.
 */

var pageName = $("title").text(); // get the name of the page
var url = document.URL;
var message = ""; // variable that will render the navigation bar

// ** will need to add other sub directory sniffers here **
var tutorialSuffix = "";
if (pageName.toLowerCase().indexOf("tutorial") > 0) {
	tutorialSuffix = "../../";
}
message += '<div class="container-fluid">'; // build main container for navigation

// Brand and toggle get grouped for better mobile display
message += '<div class="navbar-header">';
message += '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">';
message += '<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>';
message += '</button>';
// ** will need to add other sub directory sniffers here **
/*
if (pageName.toLowerCase().indexOf("tutorial") > -1) {
	message += '<a class="navbar-brand" href="' + tutorialSuffix + 'index.html">';
	message += '<img src="' + tutorialSuffix + 'images/logo.png" class="logo" title="Jawa9000 Home" alt="Jawa9000 Home" />';
}
*/

if (pageName == "Home" || pageName == "Fun Web Projects" || pageName == "Tutorials" || pageName.indexOf("Tutorials") > 0 || pageName.indexOf("Portfolio") > 0 ||  pageName == "Resume") {
	message += '<a class="navbar-brand" href="index.html">';
	message += '<img src="images/logo.png" class="logo" title="Jawa9000 Home" alt="Jawa9000 Home" />';
} else if (pageName.toLowerCase().indexOf("tutorial") > -1) {
	message += '<a class="navbar-brand" href="' + tutorialSuffix + 'index.html">';
	message += '<img src="' + tutorialSuffix + 'images/logo.png" class="logo" title="Jawa9000 Home" alt="Jawa9000 Home" />'
}
message += '</a></div>';
// Collect the nav links, forms, and other content for toggling
message += '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">';
message += '<ul class="nav navbar-nav">';
if (pageName == "Home") {
	message += '<li class="active">';
} else {
	message += '<li>';
}
if (pageName == "Home" || pageName == "Fun Web Projects" || pageName == "Tutorials" || pageName.toLowerCase().indexOf("tutorial") > 0 || pageName.indexOf("Portfolio") > 0 || pageName == "Resume") {
	message += '<a href="' + tutorialSuffix + 'index.html">Home</a>';
}
if (pageName == "Fun Web Projects") {
	message += '<li class="active"><a href="fun.html">Fun</a></li>';
} else {
	message += '<li><a href="' + tutorialSuffix + 'fun.html">Fun</a></li>';
}

// Tutorials links
if (pageName == "Tutorials" || pageName.indexOf("Tutorials") > 0 || pageName.toLowerCase().indexOf("tutorial") > -1) {
	message += '<li class="dropdown active">';
} else {
	message += '<li class="dropdown">';
}
message += '<a href="' + tutorialSuffix + 'tutorials.html" class="dropdown-toggle" data-toggle="dropdown">Tutorials<span class="caret"></span></a>';
message += '<ul class="dropdown-menu">';
// ** update these links as necessary **
// ** when a new 3D category has been created, add it here as an anchor link **
message += '<li><a href="' + tutorialSuffix + 'tutorials.html#home">Tutorials</a></li>'; 
message += '<li><a href="' + tutorialSuffix + 'tutorials.html#Animation">Animation</a></li>';
message += '<li><a href="' + tutorialSuffix + 'tutorials.html#Animation-Setup">Animation Setup</a></li>';
message += '<li><a href="' + tutorialSuffix + 'tutorials.html#Cloth">Cloth</a></li>';
message += '<li><a href="' + tutorialSuffix + 'tutorials.html#Rendering">Rendering</a></li>';
message += '<li><a href="' + tutorialSuffix + 'tutorials.html#Texturing">Texturing</a></li>';
message += '<li><a href="' + tutorialSuffix + 'tutorials.html#Theory-Reference">Theory & Reference</a></li>';
message += '<li><a href="' + tutorialSuffix + 'tutorials.html#Workshop">Workshop</a></li>';
message += '</ul></li>';
// Portfolio link
if (pageName.indexOf("Portfolio") > 0) {
	message += '<li class="dropdown active">';
} else {
	message += '<li class="dropdown">';	
}
message += '<a href="' + tutorialSuffix + 'portfolio.html" class="dropdown-toggle" data-toggle="dropdown">Portfolio<span class="caret"></span></a>';
message += '<ul class="dropdown-menu">';
// ** when a new portfolio category has been created, add it here as a page link **
message += '<li><a href="' + tutorialSuffix + 'portfolio-2d.html">2D</a></li>';
message += '<li><a href="' + tutorialSuffix + 'portfolio-3d.html">3D</a></li>';
message += '<li><a href="' + tutorialSuffix + 'portfolio-web.html">Web</a></li>';
message += '</ul></li>';
// Resume link
if (pageName == "Resume") {
	message += '<li class="active"><a href="resume.html">Resume</a></li>';
} else {
	message += '<li><a href="' + tutorialSuffix + 'resume.html">Resume</a></li>';
}
message += '</ul>';
message += '<ul class="nav navbar-nav navbar-right">';
// some media links
message += '<li class="socialLinkedIn">';
message += '<a href="http://www.linkedin.com/pub/brian-immel/2/914/b5b/" target="_blank">'; // linkedin link
message += '<img src="' + tutorialSuffix + 'images/social/glyphicons_social/png/glyphicons_social_17_linked_in.png" title="Visit Brian&#39s LinkedIn page" alt="Visit Brian&#39s LinkedIn page">';
message += '</a></li>';
message += '<li class="socialTwitter">';
message += '<a href="https://twitter.com/jawa9000" target="_blank">'; // Twitter link
message += '<img src="' + tutorialSuffix + 'images/social/glyphicons_social/png/glyphicons_social_31_twitter.png" title="Visit Brian&#39s Twitter page" alt="Visit Brian&#39s Twitter page">';
message += '</a></li>';
message += '<li class="socialJSFiddle" >';
message += '<a href="http://jsfiddle.net/user/jawa9000/fiddles/" target="_blank">'; // JSFiddle link
message += '<img src="' + tutorialSuffix + 'images/social/glyphicons_social/png/jsfiddle.png" title="Visit Brian&#39s JSFiddle page" alt="Visit Brian&#39s JSFiddle page">';
message += '</a></li>';
message += '<li class="socialFlickr">';
message += '<a href="https://www.flickr.com/photos/jawa9000/" target="_blank">'; // flickr link
message += '<img src="' + tutorialSuffix + 'images/social/glyphicons_social/png/glyphicons_social_35_flickr.png" title="Visit Brian&#39s Flickr page" alt="Visit Brian&#39s Flickr page">';
message += '</a></li>';
// email link
message += '<li>';
message += '<a href="mailto:brian@jawa9000.com?Subject=General&#160;Request&#160;,&#160;Comment&#160;,&#160;or&#160;Question">';
message += '<img src="' + tutorialSuffix + 'images/social/glyphicons_social/png/glyphicons_social_39_e-mail.png" title="Email Brian" alt="Email Brian">';
message += '</a>';
message += '</li></ul></div></div>';

document.getElementById("navigation").innerHTML = message;
