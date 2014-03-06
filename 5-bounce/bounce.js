function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function(v) {
  return new Vector(this.x + v.x, this.y + v.y);
};

Vector.prototype.scale = function(k) {
  return new Vector(this.x*k, this.y*k);
};

function Ball(elem) {
  var ball = this;
  this.element = elem;
  this.element.onclick = function(e) {
    var x = -(e.offsetX-50)/50*2000;
    var y = -(e.offsetY-50)/50*2000;
    ball.velocity = new Vector(x,y);
  };

  this.acceleration = new Vector(0,1000);
  this.velocity = new Vector(0,0);
  this.position = new Vector(
    elem.getBoundingClientRect().left+50,
    elem.getBoundingClientRect().top+50
  );
}

var minY = 50;
var maxY = window.innerHeight-50;
var minX = 50;
var maxX = window.innerWidth-50;

Ball.prototype.tick = function(t) {
  this.velocity = this.velocity.add(this.acceleration.scale(t));
  this.position = this.position.add(this.velocity.scale(t));

  if (this.position.y < minY) {
    this.position.y = 2*minY-this.position.y;
    this.velocity.y = -this.velocity.y*0.7;
    this.velocity.x = this.velocity.x*0.9;
  }

  if (this.position.y > maxY) {
    this.position.y = 2*maxY-this.position.y;
    this.velocity.y = -this.velocity.y*0.7;
    this.velocity.x = this.velocity.x*0.9;
  }

  if (this.position.x < minX) {
    this.position.x = 2*minX-this.position.x;
    this.velocity.x = -this.velocity.x*0.9;
  }

  if (this.position.x > maxX) {
    this.position.x = 2*maxX-this.position.x;
    this.velocity.x = -this.velocity.x*0.9;
  }

  this.element.style.top = this.position.y+"px";
  this.element.style.left = this.position.x+"px";
};

var ball = new Ball(document.getElementById("ball"));


setInterval(function(){ball.tick(0.033);}, 33);
