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
  object.style.display = "none";
  object.innerHTML = "";
  var c = document.cookie;
  if (c.includes(id) == false){
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
      wait,i, txt, length, id
    );
  }
}
//function that popups something up based one id (used for alert)
function popup(id){
  var object = document.getElementById(id);
  var op = object.style.opacity;
  var d = object.style.display;
  var c = document.cookie;
  object.style.display = "none";
  object.style.opacity = "0";
  object.style.transition = ".6s ease";
  object.style.WebkitTransition = ".6s ease";
  if (c.includes(id) == false){
    setTimeout(
      function displayIt(){
        object.style.display = d;
        setTimeout(
          function fadeIt(){
            object.style.opacity = op;
          },
          600
        )
      },
      1000
    );
  }
}
//function to hide things when they are clicked; second argument is used if one does not want the side not to appear in some time
function hideIt(id, days){
  var object = document.getElementById(id);
  object.style.transition = ".6s ease";
  object.style.WebkitTransition = ".6s ease";
  object.style.opacity = "0";
  setTimeout(
    function (){
      object.style.display = "none";
    },
    600
  )
  var t = new Date();
  t.setTime(t.getTime() + days * 24 * 60 * 60 * 1000);
  var wholecookie = id + "=hidden;expires=" + t.toUTCString() + ";path=/";
  document.cookie = wholecookie;
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
    400
  )
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

var animate = 1;
// animate = confirm("Want to view this webpage as an animated site?");

var titles = document.getElementsByClassName("title");
var subtitles = document.getElementsByClassName("subtitle");
var text = document.getElementsByClassName("text");
var headings = document.getElementsByClassName("heading");
var buttons = document.getElementsByClassName("btn");
var dividers = document.getElementsByClassName("divider");
var lists = document.getElementsByTagName("ul");

var things = new Array();

function pushIntoThings(nodeList){
  for (var i = 0; i < nodeList.length; i ++){
    things.push(nodeList[i]);
  }
}

pushIntoThings(titles);
pushIntoThings(subtitles);
pushIntoThings(text);
pushIntoThings(headings);
pushIntoThings(buttons);
pushIntoThings(dividers);
pushIntoThings(lists);

function move1(object){
  object.style.opacity = "0";
  object.style.transform = "translateX(12px)";
  object.style.msTransform = "translateX(12px)";
  object.style.WebkitTransform = "translateX(12px)";
}
function move2(object){
  object.style.opacity = "0";
  object.style.transform = "scale(.9,.9)";
  object.style.msTransform = "scale(.9,.9)";
  object.style.WebkitTransform = "scale(.9,.9)";
}
function move3(object){
  object.style.opacity = "0";
}
function move4(object){
  object.style.opacity = "0";
  object.style.transform = "translateY(12px)";
  object.style.msTransform = "translateY(12px)";
  object.style.WebkitTransform = "translateY(12px)";
}
function move5(object){
  object.style.opacity = "0";
  object.style.transform = "translateX(-12px)";
  object.style.msTransform = "translateX(-12px)";
  object.style.WebkitTransform = "translateX(-12px)";
}
function moveAll(){
  if(animate){
    var t = window.pageYOffset + window.innerHeight;
    for(var i = 0; i < things.length; i ++){
      if(t >= things[i].offsetTop){
        things[i].style.opacity = "1";
        things[i].style.transition = "1.5s ease";
        things[i].style.WebkitTransition = "1.5s ease";
        things[i].style.transform = "initial";
        things[i].style.msTransform = "initial";
        things[i].style.WebkitTransform = "initial";
      }
      else{
        var z = i % 5;
        switch (z) {
          case 0:
            move1(things[i]);
            break;
          case 1:
            move2(things[i]);
            break;
          case 2:
            move3(things[i]);
            break;
          case 3:
            move4(things[i]);
            break;
          case 4:
            move5(things[i]);
        }
      }
    }
  }
}
