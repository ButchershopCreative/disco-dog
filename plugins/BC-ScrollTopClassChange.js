/*
// Butchershop 2016
//
// This function will detect when the window is scrolled 50px down the screen
// and add or remove class "scrolled" to element with id of "header"
//
// 05/10/2016 - MH: created
*/

header: function(){
  var w        = $(window),
      h        = $("#header"),
      onScroll = function() {
        h[w.scrollTop() > 50 ? "addClass" : "removeClass"]('scrolled');
      };
  $(window).on('scroll', onScroll);
  onScroll();
}