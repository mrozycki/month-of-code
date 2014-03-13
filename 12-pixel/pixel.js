var width = window.innerWidth;
var height = window.innerHeight;

function vector2d (x, y) {
  this.x = x;
  this.y = y;
}

vector2d.prototype.add = function(v) {
  return new vector2d(this.x + v.x, this.y + v.y);
};

vector2d.prototype.scale = function(k) {
  return new vector2d(this.x*k, this.y*k);
};

function randomColor() {
  var color = Math.floor(Math.random()*0x1000000).toString(16);
  while (color.length < 6) {
    color += 0;
  }
  return "#"+color;
}

function fireworkCanvas(element) {
  this.element = element;
  this.element.width = width;
  this.element.height = height;
  this.context = element.getContext("2d");
  this.context.strokeStyle = "#ff0000";
  this.context.fillStyle = "#000000";
  this.context.fillRect(0,0,width,height);
}

fireworkCanvas.prototype.draw = function(v, color) {
  if (typeof color === "undefined") {
    color = "#ffffff";
  }
  var old = this.context.strokeStyle;
  this.context.strokeStyle = color;

  var drawn = false;

  var start = (v.length > 16 ? v.length-16 : 0);
  this.context.beginPath();
  this.context.moveTo(v[start].x, v[start].y);
  if (v[start].x >= 0 && v[start].x < width &&
      v[start].y >= 0 && v[start].y < height) {
    drawn = true;
  }

  for (var i = start+1; i < v.length; i++) {
    this.context.lineTo(v[i].x, v[i].y);

    if (v[i].x >= 0 && v[i].x < width &&
	v[i].y >= 0 && v[i].y < height) {
      drawn = true;
    }
  }

  this.context.stroke();

  this.context.strokeStyle = old;
  return drawn;
};

fireworkCanvas.prototype.clear = function(color) {
  if (typeof color === "undefined") {
    color = "#000000";
  }
  var old = this.context.fillStyle;
  this.context.fillStyle = color;
  this.context.fillRect(0,0,width,height);
  this.context.fillStyle = old;
};

var canvas = new fireworkCanvas(document.getElementById("pixel-canvas"));

function particle(position, velocity) {
  this.position = position;
  this.vectors = [position];
  this.velocity = velocity;
  this.acceleration = new vector2d(0,100);
}

particle.prototype.tick = function(t) {
  this.velocity = this.velocity.add(this.acceleration.scale(t/1000));
  this.position = this.position.add(this.velocity.scale(t/1000));
  this.vectors.push(this.position);
};

function firework() {
  this.density = Math.random()*100+250;
  this.particles = [];
  this.color = randomColor();
  this.position = new vector2d(Math.random()*width, Math.random()*height);

  for (var i = 0; i < this.density; i++) {
    var magnitude = Math.random()*100;
    var angle = Math.random()*2*Math.PI;
    var x = magnitude*Math.cos(angle);
    var y = magnitude*Math.sin(angle) - 0.5*magnitude;

    var velocity = new vector2d(x, y);
    var p = new particle(this.position, velocity);
    this.particles.push(p);
  }

  var this_firework = this;
}

firework.prototype.tick = function(t) {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].tick(33);
      if ( ! canvas.draw(this.particles[i].vectors, this.color)) {
	this.particles.splice(i, 1);
      }
    }

    return this.particles.length;
};

var fireworks = [];

setInterval(function() {
  canvas.clear();
  for (var i = 0; i < fireworks.length; i++) {
    if (fireworks[i].tick() <= 0) {
      fireworks.splice(i, 1);
    }
  }
}, 33);

var startFireworks = function() {
  fireworks.push(new firework());
  setTimeout(startFireworks, Math.random()*3000);
};

window.onresize = function() {
  width = window.innerWidth;
  height = window.innerHeight;
  var canvas = document.getElementById("pixel-canvas");
  canvas.width = width;
  canvas.height = height;
};

startFireworks();
