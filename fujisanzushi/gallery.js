var g = document.getElementsByClassName("gallery")[0];
var gdiv = document.getElementsByClassName("gdiv");
var gdivlen = gdiv.length;
var picarray = new Array;
for (var i = 0; i < gdivlen; i ++){
  var div = gdiv[i];
  var pic = gdiv[i].getElementsByClassName("pic")[0];
  var calcHeight = 300;
  var calcWidth = pic.naturalWidth * calcHeight / pic.naturalHeight;
  console.log(calcHeight + " | " + calcWidth);
  picarray.push(
    {
      div:div,
      calcWidth:calcWidth,
      calcHeight:calcHeight
    }
  );
}
function gallery(){
  var i = 0;
  while (i < picarray.length){
    i = galleryInner(g.clientWidth, i);
  }
}
function galleryInner(g_width, begin_index){
  var temp_width = 0;
  var next_index = begin_index;
  while (temp_width + picarray[next_index].calcWidth <= g_width && next_index < gdivlen - 1){
    temp_width += picarray[next_index].calcWidth;
    next_index += 1;
  }
  var total_width = 0;
  for (var i = begin_index; i <= next_index; i ++){
    total_width += picarray[i].calcWidth;
  }
  var shrink_ratio = g_width / total_width;
  for (var d = begin_index; d <= next_index; d ++){
    picarray[d].div.style.width = (picarray[d].calcWidth * shrink_ratio) + "px";
    picarray[d].div.style.height = (picarray[d].calcHeight * shrink_ratio) + "px";
  }
  return next_index + 1;
}
