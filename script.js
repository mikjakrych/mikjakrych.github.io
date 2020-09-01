//function to output a random integer based on minimum and maximum
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//function that types out a message in a div based on the div's id and wait time
function typer(id, wait) {
  var i = 0;
  var object = document.getElementById(id);
  var txt = object.innerHTML;
  var length = txt.length;
  object.style.visibility = "hidden";
  object.innerHTML = "";
  var c = document.cookie;
  if (c.includes(id) == false) {
    setTimeout(
      function innerTyper() {
        object.style.visibility = "visible";
        if (i < length) {
          var thechar = txt.charAt(i);
          object.innerHTML += thechar;
          i++;
          var wait;
          if (thechar == " ") {
            wait = randInt(100, 150);
          } else {
            wait = randInt(40, 70);
          }
          setTimeout(innerTyper, wait);
        };
      },
      wait, i, txt, length, id
    );
  }
}
//function that popups something up based one id (used for alert)
function popup(id, wait) {
  var object = document.getElementById(id);
  object.style.visibility = "hidden";
  var c = document.cookie;
  if (c.includes(id) == false) {
    setTimeout(
      function displayIt() {
        var k = "fadeIn .6s ease both";
        object.style.animation = k;
      },
      wait
    );
  }
}
//function to hide things when they are clicked; second argument is used if one does not want the side not to appear in some time
function hideIt(id, days) {
  var object = document.getElementById(id);
  var k = "fadeOut .6s ease both";
  object.style.animation = k;
  if (days) {
    var t = new Date();
    t.setTime(t.getTime() + days * 24 * 60 * 60 * 1000);
    var wholecookie = id + "=hidden;expires=" + t.toUTCString() + ";path=/";
    document.cookie = wholecookie;
  }
}
function toggleNav() {
  document.querySelector("#nav-wrap").classList.toggle("open");
  document.querySelector("#nav-escaper").classList.toggle("open");
  document.querySelector("#nav-toggle").classList.toggle("open");
}
var imagesToExpand = document.querySelectorAll("figure img");
for (let i = 0; i < imagesToExpand.length; i++) {
  imagesToExpand[i].addEventListener("click", function () {
    window.open(imagesToExpand[i].getAttribute("src").replace(/THUMB/, "FULL"))
  })
}