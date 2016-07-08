/*
// Butchershop 2016
// 
// This funciton will detect all external links (disregarding mailto links)
// and open them in a new window
//
// 05/10/2016 - MH: created
*/

externalLinks: function(){
    $('a').not('[href*="mailto:"]').each(function () {
    var isInternalLink = new RegExp('/' + window.location.host + '/');
    if ( ! isInternalLink.test(this.href) ) {
      $(this).attr('target', '_blank');
    }
  });
}