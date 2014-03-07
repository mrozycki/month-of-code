var oRequest = new XMLHttpRequest();
var sURL = "http://" +
         self.location.hostname +
         "/month-of-code/7-input/input.js";

oRequest.open("GET",sURL,false);
oRequest.send(null);

if (oRequest.status==200) {
  document.getElementById("text").innerHTML = oRequest.responseText;
} else {
  alert("Error executing XMLHttpRequest call!");
}
