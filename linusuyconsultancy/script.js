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
  // setTimeout(
  //   function innerToggleNav(){
  //     var navitems = document.getElementsByClassName(nav_item_default_class);
  //     if (i < navitems.length){
  //       navitems[i].classList.toggle(nav_item_open_class);
  //       i ++;
  //       setTimeout(innerToggleNav,50);
  //   }
  // },
  // 400)
}

//set the current to the index of the first slide
var current = 0;
var timer = setTimeout(nextSlide,4000);

function changeSlide(next_index){
  var old_button = document.getElementsByClassName("buttonactive")[0];
  var new_button = document.getElementsByClassName("carouselbutton")[next_index];
  var old_slide = document.getElementsByClassName("slideactive")[0];
  var new_slide = document.getElementsByClassName("carouselslide")[next_index];

  old_slide.classList.toggle("slideactive");
  new_slide.classList.toggle("slideactive");
  old_button.classList.toggle("buttonactive");
  new_button.classList.toggle("buttonactive");

  current = next_index;
  clearTimeout(timer);
  timer = setTimeout(nextSlide,4000);
}
function nextSlide(){
  if (current == document.getElementsByClassName("carouselslide").length - 1){ //you need to subtract the 1 because the highest index is one less than the count of the slides (index of nodelist begins with 0, not 1).
    changeSlide(0); //go back to the first slide
  } else{
    changeSlide(current + 1); //find the next slide
  }
}
