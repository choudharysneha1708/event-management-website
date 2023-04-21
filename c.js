// IE 11 and older do not support CSS variables, they also no longer support conditional comments for IE 10 & 11 so we need to update our base stylesheet with our fallback.

// This is assuming you have two stylesheets: 
// base.css - which uses css variables
// base-no-variables.css - which uses the fallback classes

// Ideally we would use Modernizr to detect Custom Property support but they don't have that feature yet. So for now we'll detect the browser*:
var isIE = /*@cc_on!@*/false || !!document.documentMode;

if (isIE) {
  // You can target your link element however you want but I chose to add an ID attribute.
  document.getElementById("baseCss").href = "base-no-variables.css";
}

// * Browser Detection:  https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// Note: This code is just an example of how you can implement the fallback solution in the CSS pane. We aren't providing fallback support for this pen.