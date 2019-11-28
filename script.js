//function to output a random integer based on minimum and maximum
function randInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
//function that types out a message in a div based on the div's id and wait time
function typer(id, wait){
  var i = 0;
  var object = document.getElementById(id);
  var txt = object.innerHTML;
  var length = txt.length;
  object.style.visibility = "hidden";
  object.innerHTML = "";
  var c = document.cookie;
  if (c.includes(id) == false){
    setTimeout(
      function innerTyper(){
        object.style.visibility = "visible";
        if (i < length){
          object.innerHTML += txt.charAt(i);
          i++;
          setTimeout(innerTyper, randInt(40,70));
        };
      },
      wait,i, txt, length, id
    );
  }
}
//function that popups something up based one id (used for alert)
function popup(id,wait){
  var object = document.getElementById(id);
  object.style.visibility = "hidden";
  var c = document.cookie;
  if (c.includes(id) == false){
    setTimeout(
      function displayIt(){
        var k = "fadeIn .8s ease 0s 1 normal both";
        object.style.WebkitAnimation = k;
        object.style.MozAnimation = k;
        object.style.OAnimation = k;
        object.style.animation = k;
      },
      wait
    );
  }
}
//function to hide things when they are clicked; second argument is used if one does not want the side not to appear in some time
function hideIt(id, days){
  var object = document.getElementById(id);
  var k = "fadeOut .8s ease 0s 1 normal both";
  object.style.WebkitAnimation = k;
  object.style.MozAnimation = k;
  object.style.OAnimation = k;
  object.style.animation = k;
  if(days){
    var t = new Date();
    t.setTime(t.getTime() + days * 24 * 60 * 60 * 1000);
    var wholecookie = id + "=hidden;expires=" + t.toUTCString() + ";path=/";
    document.cookie = wholecookie;
  }
}
//function to open and close nave when screen is below certain width
function toggleNav(navbar_id, navbar_open_class, nav_item_default_class, nav_item_open_class, nav_toggle_id, nav_toggle_open_class, escaper_id, escaper_open_class){
  var navbar = document.getElementById(navbar_id);
  var navitems = document.getElementsByClassName(nav_item_default_class);
  var navtoggle = document.getElementById(nav_toggle_id);
  var escaper =document.getElementById(escaper_id);
  var i = 0;
  navbar.classList.toggle(navbar_open_class);
  navtoggle.classList.toggle(nav_toggle_open_class);
  escaper.classList.toggle(escaper_open_class);
  setTimeout(
    function innerToggleNav(){
      var navitems = document.getElementsByClassName(nav_item_default_class);
      if (i < navitems.length){
        navitems[i].classList.toggle(nav_item_open_class);
        i ++;
        setTimeout(innerToggleNav,80);
      }
    },
    400)
}
//make the little nav opener
function cross(width){
  var a = width*2/5;
  var b = width*3/5;
  var c = width;
  return a + "," + 0 + " " +
  b + "," + 0 + " " +
  b + "," + a + " " +
  c + "," + a + " " +
  c + "," + b + " " +
  b + "," + b + " " +
  b + "," + c + " " +
  a + "," + c + " " +
  a + "," + b + " " +
  0 + "," + b + " " +
  0 + "," + a + " " +
  a + "," + a;
}
//function to resize game window
function resizeCanvas(){
  var canvas = document.getElementById("mycanvas");
  var pwidth = canvas.parentElement.clientWidth;
  if(pwidth <= 400){
    var factor = pwidth / 400;
    canvas.style.transform = "scale(" + factor + "," + factor + ")"
  }
}
var parallax = document.querySelectorAll(".parallax");
function calcParallax(){
  for (var i = 0; i < parallax.length; i ++){
    var o = parallax[i];
    if(window.innerWidth >= 600){
      o.style.backgroundPosition = "50% calc(100% + " + (o.offsetTop - window.pageYOffset) / 3 + "px)";
    } else{
      o.style.backgroundPosition = "center";
    }
  }
}
var animated = document.querySelectorAll("[data-animate]");
function animate(){
  var zone = window.pageYOffset + window.innerHeight;
  for(var i = 0; i < animated.length; i ++){
    var obj = animated[i];
    if(zone >= obj.offsetTop){
      var a = obj.getAttribute("data-animate");
      var b = obj.getAttribute("data-animate-delay");
      var c = obj.getAttribute("data-animate-duration")
      if(!b){b = 0}
      if(!c){c = 1.8}
      var k = a + " " + c + "s ease " + b + "s 1 normal both";
      obj.style.WebkitAnimation = k;
      obj.style.MozAnimation = k;
      obj.style.OAnimation = k;
      obj.style.animation = k;
      obj.style.visibility = "visible";
    } else{
      obj.style.WebkitAnimation = "";
      obj.style.MozAnimation = "";
      obj.style.OAnimation = "";
      obj.style.animation = "";
      obj.style.visibility = "hidden";
    }
  }
}
window.onload = function(){
  animate();
  initializeCanvas();
  resizeCanvas();
  document.getElementById("navtoggle").innerHTML = "<svg><polygon points = '" + cross(35) + "'></polygon></svg>";
  typer('sidenote',10000);
}
window.onscroll = function() {
  calcParallax();
  animate();
  popup('alert',20);
};
window.onresize = function() {
  calcParallax();
  resizeCanvas();
};
