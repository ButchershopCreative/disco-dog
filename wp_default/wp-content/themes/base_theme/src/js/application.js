(function($){

  window.App = {
    init: function(){
      $.each(App.ui,function(k,fn){ fn(); });
    },

    state: {
      device         : function(){
        if (window.getComputedStyle)
          return window.getComputedStyle(document.body,':after').getPropertyValue('content').replace(/['"]/g,'');
      },
      isSmall         : function(){ return this.device().indexOf("small")   > -1; },
      isMedium        : function(){ return this.device().indexOf("medium")  > -1; },
      isLarge         : function(){ return this.device().indexOf("large")   > -1; },
      isXLarge        : function(){ return this.device().indexOf("xlarge")  > -1; },
      isXXLarge       : function(){ return this.device().indexOf("xxlarge") > -1; },
      isDesktop       : function(){ return $.inArray(this.device(),['large', 'xlarge', 'xxlarge']) > -1; },
      isTouchSupported: function() {
        var msTouchEnabled = window.navigator.msMaxTouchPoints;
        var generalTouchEnabled = "ontouchstart" in document.createElement("div");

        if (msTouchEnabled || generalTouchEnabled) {
          return true;
        }
        return false;
      }
    },

    ui: {
    }
  };

  $(function(){ App.init(); });

})(jQuery);
