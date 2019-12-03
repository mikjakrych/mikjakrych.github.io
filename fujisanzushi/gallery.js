var g = document.getElementsByClassName("gallery")[0];
var gdiv = document.getElementsByClassName("gdiv");
var myArray = new Array;
for (var i = 0; i < gdiv.length; i ++){
  var div = gdiv[i];
  var pic = gdiv[i].getElementsByTagName("img")[0];
  var x = pic.naturalWidth;
  var y = pic.naturalHeight;
  var nY = 300;
  var nX = x / y * nY;
  myArray.push({div:div,pic:pic,x:x,y:y,nX:nX,nY:nY});
}
function gallery(){
  var i = 0;
  while (i <= myArray.length){
    i = galleryInner(g.clientWidth, i);
  }
}
function galleryInner(g_width, begin_index){
  var temp_width = 0;
  var next_index = begin_index;
  while (temp_width + myArray[next_index].nX <= g_width){
    temp_width += myArray[next_index].nX;
    next_index += 1;
  }
  var total_width = 0;
  for (var i = begin_index; i <= next_index; i ++){
    total_width += myArray[i].nX;
  }
  var shrink_ratio = g_width / total_width;
  for (var d = begin_index; d <= next_index; d ++){
    myArray[d].div.style.width = myArray[d].nX * shrink_ratio + "px";
    myArray[d].div.style.height = myArray[d].nY * shrink_ratio + "px";
  }
  return next_index + 1;
}
