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
function carousel(){
  var slides = document.getElementsByClassName("carouselslide");
  console.log(slides);
}
