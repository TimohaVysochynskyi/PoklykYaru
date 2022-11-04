//обертання якось об'єкта

function cssParallax(cont, el, radiusVal){
  $(cont).mousemove(function(event) {
      
      cx = Math.ceil($(window).width() / 2.0);
      cy = Math.ceil($(window).height() / 0.8);
      dx = event.pageX - cx;
      dy = event.pageY - cy;
      
      tiltx = (dy / cy);
      tilty = - (dx / cx);
      radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
      degree = (radius * radiusVal);

      $(el, cont).css('-webkit-transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
      $(el, cont).css('transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
  });
}

$(document).ready(function() {
  cssParallax('.parallax-container', '.parallax-base', 4);
  cssParallax('.parallax-container.first', '.parallax-base', 20);
});