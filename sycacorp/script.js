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
function toggleNav(navbar_default_class, navbar_open_class, nav_group_default_class, nav_group_open_class, nav_toggle_class, nav_toggle_open_class, escaper_id, escaper_open_class){
  var navgroup = document.getElementsByClassName(nav_group_default_class)[0];
  var navtoggle = document.getElementsByClassName(nav_toggle_class)[0];
  var navbar = document.getElementsByClassName(navbar_default_class)[0];
  var escaper =document.getElementById(escaper_id);
  navtoggle.classList.toggle(nav_toggle_open_class);
  navgroup.classList.toggle(nav_group_open_class);
  navbar.classList.toggle(navbar_open_class);
  escaper.classList.toggle(escaper_open_class);
}
var current = 0;
var timer = setTimeout(nextSlide,5000);
function changeSlide(next_index){
  var old_slide = document.getElementsByClassName("carouselslideactive")[0];
  var new_slide = document.getElementsByClassName("carouselslide")[next_index];
  old_slide.classList.toggle("carouselslideactive");
  new_slide.classList.toggle("carouselslideactive");
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
var parallax = document.querySelectorAll("[data-mk-image ='parallax']");
function mkParallax(){
  for (var i = 0; i < parallax.length; i ++){
    var o = parallax[i];
    var v = o.getBoundingClientRect().y + (window.pageYOffset - o.offsetTop)/1.2;
    o.style.backgroundPosition = "50% " + v + "px";
  }
}
function hidePreloader(){
  var preloader = document.getElementsByClassName("preloader")[0];
  preloader.classList += " preloaderhidden";
}
