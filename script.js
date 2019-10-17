//initialize and call all the functions needed

typer("sidenote", 10000);
hideIt("sidenote");
document.getElementById("navtoggle").innerHTML = "<polygon points = '" + cross(35) + "'></polygon>";

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
  object.innerHTML = "";
  setTimeout(
    function innerTyper(){
      object.style.display = "block";
      if (i < length){
        //object.style.background = "hsl(" + (50+20*Math.sin(i/10)) + ", 100%, 40%)";
        object.innerHTML += txt.charAt(i);
        i++;
        setTimeout(innerTyper, randInt(40,70));
      };
    },

    wait,i, txt, length, id);
}

//function to hide things when they are clicked
function hideIt(thing_id){
  var thing = document.getElementById(thing_id);
  thing.onclick = function(){
    thing.style.display = "none";
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
        setTimeout(innerToggleNav,30);
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
