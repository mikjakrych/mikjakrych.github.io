/*===============================

.~`~.     .~`~.     .~`~.     .~`
     `~,~'     `~,~'     `~,~'

                ^
              <   >
                .

        `Oo.oO  `Oo.oO
            o       o
           O  `Oo.oO
           o    o  o    o
           `o.o'   `o.o'

                ^
              <   >
                .

~`~.     .~`~.     .~`~.     .~`~
    `~,~'     `~,~'     `~,~'

===============================*/
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
function mkToggleNav(navbar_default_class, navbar_open_class, nav_group_default_class, nav_group_open_class, nav_toggle_class, nav_toggle_open_class, escaper_id, escaper_open_class){
  var navgroup = document.getElementsByClassName(nav_group_default_class)[0];
  var navtoggle = document.getElementsByClassName(nav_toggle_class)[0];
  var navbar = document.getElementsByClassName(navbar_default_class)[0];
  var escaper =document.getElementById(escaper_id);
  navtoggle.classList.toggle(nav_toggle_open_class);
  navgroup.classList.toggle(nav_group_open_class);
  navbar.classList.toggle(navbar_open_class);
  escaper.classList.toggle(escaper_open_class);
}
var current;
var timer;
function mkBeginSlide(ms){
  current = 0;
  timer = setTimeout(mkNextSlide,ms);
}
function mkChangeSlide(next_index){
  var old_slide = document.getElementsByClassName("carouselslideactive")[0];
  var new_slide = document.getElementsByClassName("carouselslide")[next_index];
  old_slide.classList.toggle("carouselslideactive");
  new_slide.classList.toggle("carouselslideactive");
  current = next_index;
  clearTimeout(timer);
  timer = setTimeout(mkNextSlide,5000);
}
function mkNextSlide(){
  if (current == document.getElementsByClassName("carouselslide").length - 1){ //you need to subtract the 1 because the highest index is one less than the count of the slides (index of nodelist begins with 0, not 1).
    mkChangeSlide(0); //go back to the first slide
  } else{
    mkChangeSlide(current + 1); //find the next slide
  }
}
var parallax = document.querySelectorAll("[data-mk-image ='parallax']");
function mkParallax(){
  for (var i = 0; i < parallax.length; i ++){
    var o = parallax[i];
    var v = (o.offsetTop - window.pageYOffset) / 3;
    o.style.backgroundPosition = "50% calc(100% + " + v + "px)";
  }
}
function mkLoad(){
  var preloader = document.getElementsByClassName("preloader")[0];
  preloader.classList.add("preloaderhidden");
}
var animated = document.querySelectorAll("[data-mk-animate]");
function mkAnimate(){
  var zone = window.pageYOffset + window.innerHeight;
  for(var i = 0; i < animated.length; i ++){
    var obj = animated[i];
    if(zone >= obj.offsetTop){
      var a = obj.getAttribute("data-mk-animate");
      var b = obj.getAttribute("data-mk-delay");
      if(!b){b = 0}
      var k = a + " 1.5s ease " + b + "s 1 normal both";
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
window.onscroll = function() {
  mkParallax();
  mkAnimate();
};
