var maxDiff = 100;
var dragStart = null;
let currentPos = { x: 0, y: 0 };
 var sliders;
var min;
var max;
var range;
var size;
window.onload = function(){
    sliders = [
        {id: "slidera", slider: $("slidera"), x: 0, lastX: 0}, 
        {id: "sliderb", slider: $("sliderb"), x: 0, lastX: 0}, 
        {id: "sliderc", slider: $("sliderc"), x: 0, lastX: 0},
        {id: "sliderd", slider: $("sliderd"), x: 0, lastX: 0}, 
        {id: "slidere", slider: $("slidere"), x: 0, lastX: 0}, 
        {id: "sliderf", slider: $("sliderf"), x: 0, lastX: 0}
    ];
    
    
    range = $("slidersize");
    size = range.offsetWidth;
    min = -(size/2) + 15;
    max = size/2;
    var mid = 0;
    
    for( var i = 0; i < sliders.length; i++ )
    {
        sliders[i].slider.addEventListener('mousedown', handleMouseDown); 
        sliders[i].slider.addEventListener('touchstart', handleMouseDown);
        sliders[i].slider.style.transform = `translate3d(${mid}px,0px,0px)`;
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    setInterval( () => console.log( ((getLastMovedSliderPosition() / (size)) * 175) + 90 ), 300);
}

var sliderIdx = 0;
function handleMouseDown(event) {
    for( var i = 0; i < sliders.length; i++ ){
        if( sliders[i].id == event.target.id)
            sliderIdx = i;
        
    }
    
    sliders[sliderIdx].slider.style.transition = '0s';
    
    if (event.changedTouches) {
      dragStart = {
        x: event.changedTouches[0].clientX,
        y: 0
      };
      return;
    }
    dragStart = {
      x: event.clientX,
      y:0
    };
    //console.log(event.clientX);

  }
var lastX = 0;
function handleMouseMove(event) {
    //console.log("moved");
    if (dragStart === null) return;
    event.preventDefault();
    if (event.changedTouches) {
      event.clientX = event.changedTouches[0].clientX;
    }
      
    const xDiff = event.clientX - dragStart.x;
    const distance = Math.min( maxDiff, xDiff);
      
    sliders[sliderIdx].x = Math.min(max, xDiff + sliders[sliderIdx].lastX);
    sliders[sliderIdx].x = Math.max(min, sliders[sliderIdx].x);
      
    sliders[sliderIdx].slider.style.transform = `translate3d(${sliders[sliderIdx].x}px, 0px, 0px)`;
}
function handleMouseUp(event) {
    if (dragStart === null) return;
    //stick.style.transition = '.2s';
    //sliders[sliderIdx].slider.transform = `translate3d(75px, 75px, 0px)`;
    sliders[sliderIdx].lastX = sliders[sliderIdx].x;
    dragStart = null;
}
function getLastMovedSliderPosition(){
    return sliders[sliderIdx].x;
}
