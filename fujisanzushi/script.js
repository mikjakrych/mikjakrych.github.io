function toggleNav(navbar_default_class, navbar_open_class, toggle_default_class, toggle_open_class, escaper_default_class, escaper_open_class){
  var toggle = document.getElementsByClassName(toggle_default_class)[0];
  var navbar = document.getElementsByClassName(navbar_default_class)[0];
  var escaper =document.getElementsByClassName(escaper_default_class)[0];
  toggle.classList.toggle(toggle_open_class);
  navbar.classList.toggle(navbar_open_class);
  escaper.classList.toggle(escaper_open_class);
}
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
var currentSlide;
var carouselTimer;
var slideDelay;
function initializeCarousel(slide_delay){
  currentSlide = 0;
  slideDelay = slide_delay;
  carouselTimer = setTimeout(nextSlide,slideDelay);
}
function changeSlide(next_index){
  var old_button = document.getElementsByClassName("buttonactive")[0];
  var new_button = document.getElementsByClassName("carouselbutton")[next_index];
  var old_slide = document.getElementsByClassName("slideactive")[0];
  var new_slide = document.getElementsByClassName("carouselslide")[next_index];
  old_slide.classList.toggle("slideactive");
  new_slide.classList.toggle("slideactive");
  old_button.classList.toggle("buttonactive");
  new_button.classList.toggle("buttonactive");
  currentSlide = next_index;
  clearTimeout(carouselTimer);
  carouselTimer = setTimeout(nextSlide,slideDelay);
}
function nextSlide(){
  if (currentSlide == document.getElementsByClassName("carouselslide").length - 1){ //you need to subtract the 1 because the highest index is one less than the count of the slides (index of nodelist begins with 0, not 1).
    changeSlide(0); //go back to the first slide
  } else{
    changeSlide(currentSlide + 1); //find the next slide
  }
}
function previousSlide(){
  if (currentSlide == 0){
    changeSlide(document.getElementsByClassName("carouselslide").length - 1);
  } else{
    changeSlide(currentSlide - 1);
  }
}
function preloader(){
  var preloader = document.getElementsByClassName("preloader")[0];
  preloader.classList.add("preloaderhidden");
}
