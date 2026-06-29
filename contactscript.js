window.addEventListener("load", () => {

    const fade = document.getElementById("fade");

    setTimeout(() => {
        fade.classList.add("fade-out");
    }, 50);

});

const card = document.getElementById("card");

let hovering = false;
let start = 0;

card.addEventListener("mouseenter", () => {

    hovering = true;
    start = performance.now();

    requestAnimationFrame(jiggle);

});

card.addEventListener("mouseleave", () => {

    hovering = false;

    card.style.transform =
        "rotate(0deg) scale(1)";

});

function jiggle(time){

    if(!hovering) return;

    const t = (time-start)/1000;

    const rotate = Math.sin(t*22)*2.5;
    const y = Math.sin(t*16)*3;

    card.style.transform =
        `translateY(${y}px)
         rotate(${rotate}deg)
         scale(1.03)`;

    requestAnimationFrame(jiggle);

}