function is_prime(n) {
  for (var i = 2; i*i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function pad(n) {
  var s = n.toString(10);
  while (s.length < 6) {
    s = "0"+s;
  }
  return s;
}

var elem = document.getElementById("number");
var started = false;

function next_prime(n) {
  if (n >= 1000000) n -= 1000000;

  elem.innerHTML = pad(n);
  if (is_prime(n)) {
    elem.className = "prime";
    return;
  }

  setTimeout (function() { next_prime(n+1); }, 150);
}

elem.onclick = function() {
  if (elem.className !== "prime" && started) return;
  document.getElementsByClassName("info")[0].style.color = "transparent";

  started = true;

  var n = Number(elem.innerHTML);
  elem.innerHTML = pad(n);
  elem.className = "";
  next_prime(n+1);
};

var start = Math.floor(Math.random()*1000000);

if (is_prime(start)) {
  elem.className = "prime";
}

elem.innerHTML = pad(start);
