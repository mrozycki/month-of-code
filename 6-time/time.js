var ticks = [];

function toBinary(v) {
  var result = [];
  for (var i = 0; v > 0; v = Math.floor(v/2)) {
    result.push(v%2);
  }
  return result.reverse();
}

var startTime = toBinary(Math.floor(new Date().getTime()/1000));

for (var i = 0; i < 32; i++) {
  var tick = document.createElement("div");
  if (startTime[i] === 0) 
    tick.className = "tick";
  else
    tick.className = "tick on";
  document.getElementById("binary-clock").appendChild(tick);
  ticks.push(tick);
}

setInterval(function() {
  for (var i = ticks.length-1; i >= 0; i--) {
    if (ticks[i].className === "tick on") {
      ticks[i].className = "tick";
    } else {
      ticks[i].className = "tick on";
      break;
    }
  }
}, 1000);
