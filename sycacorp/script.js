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

//function to open and close nave when screen is below certain width
function toggleNav(navbar_default_class, navbar_open_class, nav_group_default_class, nav_group_open_class, nav_toggle_class, nav_toggle_open_class){
  var navgroup = document.getElementsByClassName(nav_group_default_class)[0];
  var navtoggle = document.getElementsByClassName(nav_toggle_class)[0];
  var navbar = document.getElementsByClassName(navbar_default_class)[0];
  // var i = 0;

  navtoggle.classList.toggle(nav_toggle_open_class);
  navgroup.classList.toggle(nav_group_open_class);
  navbar.classList.toggle(navbar_open_class);
}
var current = 0;
var timer = setTimeout(nextSlide,5000);

function changeSlide(next_index){
  // var old_button = document.getElementsByClassName("buttonactive")[0];
  // var new_button = document.getElementsByClassName("carouselbutton")[next_index];
  var old_slide = document.getElementsByClassName("carouselslideactive")[0];
  var new_slide = document.getElementsByClassName("carouselslide")[next_index];

  old_slide.classList.toggle("carouselslideactive");
  new_slide.classList.toggle("carouselslideactive");
  // old_button.classList.toggle("buttonactive");
  // new_button.classList.toggle("buttonactive");

  current = next_index;
  clearTimeout(timer);
  timer = setTimeout(nextSlide,5000);
}
function nextSlide(){
  if (current == document.getElementsByClassName("carouselslide").length - 1){ //you need to subtract the 1 because the highest index is one less than the count of the slides (index of nodelist begins with 0, not 1).
    changeSlide(0); //go back to the first slide
  } else{
    changeSlide(current + 1); //find the next slide
  }
}

var up = document.getElementsByClassName("floatup");
var left = document.getElementsByClassName("floatleft");
var right = document.getElementsByClassName("floatright");
var zoom = document.getElementsByClassName("zoom");
var thingsToMove = new Array;
var originalTransform = new Array;
var direction = new Array;
function pushIntoThingsToMove(nodeList, type){
  for (var i = 0; i < nodeList.length; i ++){
    thingsToMove.push(nodeList[i]);
    originalTransform.push(nodeList[i].style.transform);
    direction.push(type);
  }
}
pushIntoThingsToMove(up, "up");
pushIntoThingsToMove(left, "left");
pushIntoThingsToMove(right, "right");
pushIntoThingsToMove(zoom, "zoom");

var parallax = document.getElementsByClassName("parallax");
function mkParallax(){
  for (var i = 0; i < parallax.length; i ++){
    var o = parallax[i];
    var v = o.getBoundingClientRect().y + (window.pageYOffset - o.offsetTop)/1.2;
    o.style.backgroundPosition = "50% " + v + "px";
  }
}

function moveAll(){
  var t = window.pageYOffset + window.innerHeight;
  for(var i = 0; i < thingsToMove.length; i ++){
    var object = thingsToMove[i];
    if(t < object.offsetTop){
      var c = direction[i];
      switch (c) {
        case "up":
          object.style.transform = "translateY(50%)";
          object.style.msTransform = "translateY(50%)";
          object.style.WebkitTransform = "translateY(50%)";
          break;
        case "left":
          object.style.transform = "translateX(50%)";
          object.style.msTransform = "translateX(50%)";
          object.style.WebkitTransform = "translateX(50%)";
          break;
        case "right":
          object.style.transform = "translateX(-50%)";
          object.style.msTransform = "translateX(-50%)";
          object.style.WebkitTransform = "translateX(-50%)";
          break;
        case "zoom":
          object.style.transform = "scale(.75,.75)";
          object.style.msTransform = "scale(.75,.75)";
          object.style.WebkitTransform = "scale(.75,.75)";
      }
    } else{
      object.style.transform = originalTransform[i];
      object.style.transition = "2s ease";
      object.style.WebkitTransition = "2s ease";
      setTimeout(
        function(){
          object.style.transform = originalTransform[i];
        },
        2000
      )
    }
  }
}
function hidePreloader(){
  var preloader = document.getElementById("preloader");
  preloader.style.animationPlayState = "running";
}
