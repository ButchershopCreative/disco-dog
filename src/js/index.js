var jQuery = require('jquery');

(function($) {

  var App =  {
    init: function() {
      console.log(1);
    }
  }

  $(document).ready(function() { App.init(); });
})(jQuery);
