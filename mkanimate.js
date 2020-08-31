var animatedElements = document.querySelectorAll("[data-mk-animate]");
function animate() {
    var zone = window.pageYOffset + window.innerHeight;
    for (var i = 0; i < animatedElements.length; i++) {
        var obj = animatedElements[i];
        if (zone >= obj.offsetTop) {
            var a = obj.getAttribute("data-mk-animate");
            var b = obj.getAttribute("data-mk-animate-delay");
            var c = obj.getAttribute("data-mk-animate-duration")
            if (!b) { b = 0 }
            if (!c) { c = 1.2 }
            var k = a + " " + c + "s ease " + b + "s 1 normal both";
            obj.style.animation = k;
            obj.style.visibility = "visible";
        } else {
            obj.style.animation = "";
            obj.style.visibility = "hidden";
        }
    }
}