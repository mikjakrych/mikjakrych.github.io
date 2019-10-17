//call all the functions needed

typer("sidenote", 10000);
hideIt("sidenote");

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
        object.style.background = "hsl(" + (i/length*210) + ", 100%, 56%)";
        object.innerHTML += txt.charAt(i);
        i++;
        setTimeout(innerTyper, randInt(60,100));
      };
    },

    wait,i, txt, length, id);
}

//function to hide things when they are clicked
function hideIt(thing_id){
  var thing = document.getElementById(thing_id);
  thing.onclick = function(){
    thing.style.opacity = "0";
  }
}

//function to open and close nave when screen is below certain width
function toggleNav(navbar_id, navbar_open_class, nav_item_default_class, nav_item_open_class, nav_toggle_id, nav_toggle_open_class){
  var navbar = document.getElementById(navbar_id);
  var navitems = document.getElementsByClassName(nav_item_default_class);
  var navtoggle = document.getElementById(nav_toggle_id)
  var i = 0;

  navbar.classList.toggle(navbar_open_class);
  navtoggle.classList.toggle(nav_toggle_open_class);

  setTimeout(
    function innerToggleNav(){
      var navitems = document.getElementsByClassName(nav_item_default_class);
      if (i < navitems.length){
        navitems[i].classList.toggle(nav_item_open_class);
        i ++;
        setTimeout(innerToggleNav,40);
    }
  },
  200)
}
