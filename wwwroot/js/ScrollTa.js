const slider = document.querySelector('.items');
//console.log("slider", slider);
let isDown = false;
let startX;
let scrollLeft;


slider.addEventListener('mousedown', (e) => {
    $('html').css('cursor', 'col-resize');
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
    $('html').css('cursor', 'auto');
    isDown = false;
    slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
});

var updateScrollPos = function (e) {
    $('html').css('cursor', 'row-resize');
    $(window).scrollLeft($(window).scrollLeft() + (clickY - e.pageY));
}