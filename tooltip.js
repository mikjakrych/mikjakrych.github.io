//number of escapes you've hit within a certain duration
var esccount = 0;
//x and y dist from mouse cursor to tooltip
var distFromTT = 10;
//dist from tooltip to wall
var distFromWall = 10;
//make tooltip
var tooltip = document.createElement("div");
tooltip.setAttribute("id", "tooltip");
tooltip.style.display = "none";
tooltip.style.position = "fixed";
document.body.appendChild(tooltip);
//by default, show help is true
showHelp = true;

function initTooltip(e, t) {
    elem = e.target;
    if (elem.getAttribute("data-tooltip-state") != "initialized") {
        elem.addEventListener("mousemove", function (e) {
            moveTooltip(e, t);
        }, true);
        elem.addEventListener("mouseleave", hideTooltip, true);
        elem.setAttribute("data-tooltip-state", "initialized");
    }
}

function hideTooltip() {
    tooltip.innerText = "...";
    tooltip.style.display = "none";
}

function moveTooltip(e, t) {
    var x = e.clientX;
    var y = e.clientY;
    tooltip.innerText = t ? t : e.target.innerText;
    if (showHelp) {
        tooltip.style.display = "block";
    }
    //get width and height
    var w = tooltip.offsetWidth;
    var h = tooltip.offsetHeight;
    //if tooltip has not collided with right side of window...
    if (document.body.clientWidth - x - distFromWall - w - distFromTT < 0) {
        //if aligning right side of tooltip to cursor causes
        //it to collide with left wall...
        if (x - w - distFromTT - distFromWall < 0) {
            // console.log("align to left side")
            //align tooltip to left side
            tooltip.style.left = distFromWall + "px";
        } else {
            // console.log("align right side to cursor")
            //align right side to tooltip to cursor
            tooltip.style.left = x - w - distFromTT + "px";
        }
    } else {
        // console.log("align left side to cursor")
        //align left side to tooltip to cursor
        tooltip.style.left = x + distFromTT + "px";
    }
    //same resoning but for vertical alignment
    if (document.body.clientHeight - y - distFromWall - h - distFromTT < 0) {
        if (y - h - distFromTT - distFromWall < 0) {
            // console.log("align to top side")
            tooltip.style.top = distFromWall + "px";
        } else {
            // console.log("align bottom side to cursor")
            tooltip.style.top = y - h - distFromTT + "px";
        }
    } else {
        // console.log("align top side to cursor")
        tooltip.style.top = y + distFromTT + "px";
    }
}

// document.body.addEventListener("keyup", function (e) {
//     //if you pressed the ESC key...
//     if (e.keyCode === 27) {
//         //if you haven't pressed ESC within certain duration
//         if (esccount === 0) {
//             //set a timer to clear esccount
//             setTimeout(function () {
//                 esccount = 0;
//             }, 500);
//         }
//         //add to esccount
//         esccount++;
//     } else {
//         esccount = 0;
//     }
// })