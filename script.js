type("sidenote", 100);

function type(id, wait){
  var i = 0;
  var txt = document.getElementById(id).innerHTML;
  var length = txt.length;
  document.getElementById(id).innerHTML = "";
  setTimeout(innertyper,wait,i, txt, length, id);
};

function innertyper(i, txt, length, id) {
  document.getElementById(id).style.display = "block";
  if (i < length){
    document.getElementById(id).innerHTML += txt.charAt(i);
    i++;
    setTimeout(innertyper, 50, i, txt, length, id);
  };
};

function clickHide(id){
  var x = document.getElementById(id);
  x.style.display = "none";
  document.cookie = "sidenote=clicked";
  var y = document.cookie;
  console.log(y);
}
