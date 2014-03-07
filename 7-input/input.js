var oRequest = new XMLHttpRequest();
var sURL = "http://" +
         self.location.hostname +
         "/month-of-code/7-input/input.js";

oRequest.open("GET",sURL,false);
oRequest.send(null);

if (oRequest.status==200) {
  document.getElementById("text").innerHTML = "Loaded. Start typing<br>";
  var text = oRequest.responseText;
  var justLoaded = true;
} else {
  document.getElementById("text").innerHTML = "ERROR "+oRequest.status;
  document.getElementById("eos").style.display = "block";
}

window.onkeypress = function() {
  if (typeof text === "undefined" || text.length === 0) {
    document.getElementById("eos").style.display = "block";
    return;
  }

  if (justLoaded) {
    document.getElementById("text").innerHTML = text[0];
    justLoaded = false;
  } else {
    document.getElementById("text").innerHTML += text[0];
  }

  text = text.substring(1);
};
