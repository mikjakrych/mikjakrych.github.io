var parallax = document.querySelectorAll(".parallax");
function calcParallax() {
  for (var i = 0; i < parallax.length; i++) {
    var o = parallax[i];
    if (window.innerWidth >= 600) {
      o.style.backgroundPosition = "50% calc(100% + " + (o.offsetTop - window.pageYOffset) / 3 + "px)";
    } else {
      o.style.backgroundPosition = "center";
    }
  }
}