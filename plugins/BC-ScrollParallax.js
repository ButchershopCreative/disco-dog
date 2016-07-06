/*
// Butchershop 2016
//
// This tool is meant for parallax scenes for animations in javascript
// to "pin" the element to the screen, or to animate while scrolling
// and to "rewind" when you scroll back up. This is not a scroll Hijack
//
// Dependencies:
//  JQuery: https://jquery.com/
//  ScrollMagic: http://scrollmagic.io/
//  TweenMax, TimlineMax: https://greensock.com/
//
// 7/6/2016 - DW : Created
*/

var scrollParallax = {
  //TODO: before initializing we need to scroll to top of page.
  //TODO: Need every element that was pinned to go into a global array so we can destroy all pins on resize events.

    init: function() {
      this._resizeScene();
      this.scene();
    },

    _initializeTween: function(tweenElement, starting, duration) {
      var controller = new ScrollMagic.Controller();

      new ScrollMagic.Scene({
        duration: duration,
        offset: starting
      })
      .setTween(tweenElement)
      .addTo(controller);
    },

    _initializeScene: function(pinningElement, starting, duration) {
      var controller = new ScrollMagic.Controller();

      new ScrollMagic.Scene({
        duration: duration,
        offset: starting
      })
      .setPin(pinningElement)
      .addTo(controller);
    },

    //Auto path setter for proper SVG strokedasharray attributes
    _setPathLength: function(array) {
      for(var i = 0; i < array.length; i++) {
        $(array[i]).css("stroke-dashoffset", array[i].getTotalLength() );
        $(array[i]).css("stroke-dasharray", array[i].getTotalLength() + ' ' + array[i].getTotalLength() );
      }
    },

    _resizeScene: function() {
      //Needs refactor
      window.addEventListener('resize', function() {
        location.reload();
      });
    },

    scene: function() {
      //Pinning element selector
      var scenePin = document.querySelector('#circle-challenge');

      //Section selector when to start the animation on a scroll point
      var sceneTop = document.querySelector('#ApproachTwo').offsetTop;

      //Element(s) selector you want to animate
      var element = document.querySelectorAll('.element');

      //Initialize new timeline for all elements.
      var sceneTransition = new TimelineMax();
      sceneTransition.to(element, //Element or array
                          1, //Duration ranges from 0-1, 1 meaning 100% of the whole duration
                          {opacity: 1, y: 0}); //Transition elements.

      //Scene is for when element pins and the duration (pinElement, startingPoint, duration);
      this._initializeScene(element, sceneOneTop , 2000);

      //Setting element up for "Tweening" or animating (element, startingPoint, duration);
      this._initializeTween(element, sceneTop , 1000, scenePin);

      //example of chaining multiple elements
      var exampleTransition = new TimelineMax();
      exampleTransition.fromTo(challengeHeader, 1, {y: 10, opacity: 0}, {y: 0, opacity: 1})
        .add(TweenMax.staggerFromTo(challengeText, 1, {opacity: 0}, {opacity: 1}, 0.1))
        .add(TweenMax.to(challengeIconWhite, 0.5, {stroke: '#FFFFFF'}))

      this._initializeScene(sceneOnePin, sceneOneTop, 10000);
      this._initializeTween(challengeTween, sceneOneTop, 2000, sceneOnePin);

    }
}

