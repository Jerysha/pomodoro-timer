const circle = document.querySelector(".progress-ring_circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
/*stroke-dasharray - This property is like border-style: dashed but it lets you define the width of the dashes and the gap between them. stroke-dashoffset - Decreasing stroke-dasharray would start to reveal our shape. Therefore, as the percent grows we need to reduce the offset like I do in setProgress
My Source of this circular progress trick -> css-tricks article in description*/
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent){
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}