function generateTick() {
  var tick = document.createElement("div");
  tick.className = "tick";
  if (Math.random() < 0.3) tick.className += " one";

  var one = document.createElement("span");
  one.innerHTML = "1";
  one.className = "one";
  tick.appendChild(one);

  var zero = document.createElement("span");
  zero.innerHTML = "0";
  zero.className = "zero";
  tick.appendChild(zero);

  tick.toggle = function() {
    if (tick.className === "tick one") {
      tick.className = "tick";
    } else {
      tick.className = "tick one";
    }
  };

  return tick;
}

var ticks = [], height = 0, width = 0;

function toggleRandomTick() {
  var index = Math.floor(Math.random()*ticks.length);
  ticks[index].toggle();
}

for (var i = 0; i < 100; i++) {
  setInterval(toggleRandomTick, Math.random()*100);
}

window.onresize = function() {
  height = Math.floor(window.innerHeight / 42)+1;
  width = Math.floor(window.innerWidth / 24);
  for (var i = ticks.length; i < width*height; i++) {
    ticks[i] = generateTick();
    document.getElementById("ticks").appendChild(ticks[i]);
  }
};

window.onresize();
