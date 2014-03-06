var elem = document.getElementById("error");
var hash = decodeURIComponent(window.location.hash);

if (hash !== "" && hash !== "#") {
  elem.innerHTML = hash.slice(1);
}

function displacement() {
  var x = Math.random()*100-50;
  var y = Math.random()*100-50;

  var oldy = elem.getBoundingClientRect().top+75;

  elem.style.top = y+oldy+"px";
  elem.style.left = x+"px";

  setTimeout(function() {
    elem.style.top = oldy+"px";
    elem.style.left = 0;
    setTimeout(function() {
      displacement();
    }, Math.random()*1000);
  }, Math.random()*200);
}
setTimeout(displacement, Math.random()*1000);

function letterSwap() {
  var text = elem.innerHTML;
  var letters = text.split("");
  var number = Math.floor(Math.random()*letters.length);

  for (var i = 0; i < number; i++) {
    var index = Math.floor(Math.random()*letters.length);
    var letter = String.fromCharCode(Math.floor(Math.random()*(126-33)+33));
    letters[index] = letter;
  }

  elem.innerHTML = letters.join("");

  setTimeout(function() {
    elem.innerHTML = text;
    setTimeout(function() {
      letterSwap();
    }, Math.random()*1000);
  }, Math.random()*200);
}
setTimeout(letterSwap, Math.random()*1000);

function colorChange() {
  var color = elem.style.color;
  var newcolor = "";
  while (newcolor.length < 6) {
   newcolor = Math.floor(Math.random()*0x1000000).toString(16);
  }
  elem.style.color = "#"+newcolor;

  setTimeout(function() {
    elem.style.color = color;
    setTimeout(function() {
      colorChange();
    }, Math.random()*1000);
  }, Math.random()*200);
}
setTimeout(colorChange, Math.random()*1000);

