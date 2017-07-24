// import $ from 'jquery';
// window.$ = window.jQuery = $; // Making these bad boys global so we dont require them anywhere else
import Example from './components/_Example.js';

(function($) {
  var App =  {
    init: function() {
        Example();
    },
    initAppearWatchers: function() {
      console.log("testing");
      appear({
        elements: function elements() {
          return document.getElementsByClassName('appear');
        },
        appear: function appear(el) {
          var item = $(el);
          console.log("ADDING", el);
          item.addClass('visible-element');
        },
        bounds: 0
      })
    }
  }
  $(document).ready(function() {
    App.init();
    App.initAppearWatchers();
    $(function() {
      $('.lazy').Lazy({
        threshold: 100,
        delay: 5
      });
    });
  });
})(jQuery);
