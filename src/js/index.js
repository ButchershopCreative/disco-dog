var jQuery = require('jquery');

window.jQuery = $;
window.$ = jQuery;

(function($) {

  var App =  {
    init: function() {
      console.log(1);
    }
  }

  $(document).ready(function() { App.init(); });
})(jQuery);
