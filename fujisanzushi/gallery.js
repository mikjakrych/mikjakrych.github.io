var g;
var gdiv;
var gdivlen;
var picarray = new Array;
function initializeGallery(){
  g = document.getElementsByClassName("gallery")[0];
  gdiv = document.getElementsByClassName("gdiv");
  gdivlen = gdiv.length;
  for (var i = 0; i < gdivlen; i ++){
    var div = gdiv[i];
    var pic = gdiv[i].getElementsByClassName("pic")[0];
    var calcHeight = 300;
    var calcWidth = pic.naturalWidth * calcHeight / pic.naturalHeight;
    picarray.push(
      {
        div:div,
        calcWidth:calcWidth,
        calcHeight:calcHeight
      }
    );
  }
}

function gallery(){
  var i = 0;
  while (i < picarray.length){
    i = galleryInner(g.clientWidth, i);
  }
}
function galleryInner(g_width, begin_index){
  var temp_width = 0;
  var temp_index = begin_index;
  while (picarray[temp_index]){
    if(temp_width + picarray[temp_index].calcWidth <= g_width && temp_index < gdivlen){
      temp_width += picarray[temp_index].calcWidth;
      temp_index ++;
    } else{
      break;
    }
  }
  if(temp_index == gdivlen){
    for (var i = begin_index; i < temp_index; i ++){
      picarray[i].div.style.width = picarray[i].calcWidth + "px";
      picarray[i].div.style.height = picarray[i].calcHeight + "px";
    }
  } else{
    var total_width = 0;
    for (var i = begin_index; i <= temp_index; i ++){
      total_width += picarray[i].calcWidth;
    }
    var shrink_ratio = g_width / total_width;
    for (var i = begin_index; i <= temp_index; i ++){
      picarray[i].div.style.width = (picarray[i].calcWidth * shrink_ratio) + "px";
      picarray[i].div.style.height = (picarray[i].calcHeight * shrink_ratio) + "px";
    }
  }
  return temp_index + 1;
}
