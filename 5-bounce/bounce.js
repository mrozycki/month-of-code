function getCookie(cookie) {
  var name = cookie+"=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var trimmed = cookies[i].trim();
    if (trimmed.indexOf(name)===0) {
      return trimmed.substring(name.length);
    }
  }
  return "";
}

function Game() {
  this.points = 0;

  if (getCookie("best")==="") this.best = 0;
  else this.best = Number(getCookie("best"));

  this.updateBest();
}

Game.prototype.score = function() {
  this.points ++;
  this.updatePoints();
};

Game.prototype.lose = function() {
  if (this.points === 0) return;
  
  if (this.points > this.best) {
    this.best = this.points;
    this.updateBest();
  }

  this.points = 0;
  this.updatePoints();
};

Game.prototype.updatePoints = function() {
  document.getElementById("score").innerHTML = this.points;
};

Game.prototype.updateBest = function() {
  document.cookie = "best="+this.best+";"+
    "expires="+new Date(new Date().getTime()+1000*60*60*24*365*10);

  document.getElementById("best").innerHTML = "Best: "+this.best;
};

var game = new Game();

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

if (typeof Math.sign == "undefined") {
  Math.sign = function(v) {
    if (v > 0) return -1;
    else if (v < 0) return 1;
    else if (v === 0) return 0;
    else return NaN;
  };
}

function Ball(elem) {
  var ball = this;
  this.element = elem;
  this.element.onclick = function(e) {
    var x = -(e.offsetX-50)/50*500;
    var y = Math.sign((e.offsetY-50)/50)*500;
    ball.velocity = new Vector(x,y);
    game.score();
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

  if (this.position.y > maxY) {
    this.position.y = 2*maxY-this.position.y;
    this.velocity.y = -this.velocity.y*0.7;
    this.velocity.x = this.velocity.x*0.95;
    game.lose();
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

window.onresize = function() {
  maxY = window.innerHeight-50;
  maxX = window.innerWidth-50;
}

setInterval(function(){ball.tick(0.033);}, 33);
