/**
 * @author Shrinidhi Shastri
 * @param window
 * @param $
 *            jQuery object
 */
// Self executing anonymous function
(function(window, $) {

    'use strict';

    window.Slides = function() {
        this.initialize.apply(this, arguments);
    };
    window.Slides.prototype = {
        /**
         * Initialize the slide show
         * 
         * @method initialize
         */
        initialize : function() {
            this.slide = 1;
            this.setupEvents();
            this.goToCurrentSlide();
        },
        /**
         * Sets up events to handle slide navigation
         * 
         * @method setupEvents
         */
        setupEvents : function() {
            var self, $win;
            self = this;
            $win = $(window);
            $win.on("keyup", function(ev) {
                self.handleKeyPress(ev);
            });
            $win.on("popstate", function(ev) {
                self.goToSlide(ev.originalEvent.state, false);
            });
            $win.on("click", function(evt) {
                ev.stopPropagation();
                if (evt.clientX < ($(window).width() / 2)) {
                    self.goBack();
                } else {
                    self.goForward();
                }
            });
            $win.on("touchend", function(ev) {
                ev.stopPropagation();
                var xPos = ev.originalEvent.changedTouches[0].clientX;
                if (xPos < ($(window).width() / 2)) {
                    self.goBack();
                } else {
                    self.goForward();
                }
            });
        },
        /**
         * Handles ArrowKeys and Enter key press events.
         * 
         * @method handleKeyPress
         */
        handleKeyPress : function(ev) {
            if (!$("#slides").is(":animated")) {
                if (ev.keyCode === 39 || ev.keyCode === 40 || ev.keyCode === 13) {
                    // right or bottom arrow or Enter
                    this.goForward();
                } else if (ev.keyCode === 37 || ev.keyCode === 38) {
                    // left or top arrow
                    this.goBack();
                }
            }
        },
        /**
         * Displays the current slide as indicated by the hash location, else
         * goes to slide 1
         * 
         * @method goToCurrentSlide
         */
        goToCurrentSlide : function() {
            var toSlide, hashStr;
            toSlide = 1;
            hashStr = window.location.hash;
            if (hashStr && !isNaN(hashStr.substring(1))) {
                toSlide = parseInt(hashStr.substring(1));
            }
            this.goToSlide(toSlide);
        },
        /**
         * Displays a slide indicated by toSlide. If toSlide is out of bounds,
         * displays current slide.
         * 
         * @method goToSlide
         * @param toSlide
         *            {Number} Slide number to go to
         * @param pushState
         *            {Boolean} To prevent adding the state to the browser
         *            history.
         * 
         */
        goToSlide : function(toSlide, pushState) {
            var selector;
            if (pushState === undefined) {
                pushState = true;
            }
            if (!toSlide) {
                this.goToCurrentSlide();
            }

            if (isNaN(toSlide) || toSlide < 1
                    || toSlide > $('.slideWrapper').size()) {
                return;
            }

            $(".selected").removeClass('selected');
            selector = ".slideWrapper:eq(" + (toSlide - 1) + ")";
            $(selector).addClass("selected");
            this.slide = toSlide;
            if (pushState) {
                history.pushState(toSlide, "Slide " + toSlide, "#" + toSlide);
            }
        },
        /**
         * Goes back 1 slide.
         * 
         * @method goBack
         */
        goBack : function() {
            var toSlide;
            toSlide = this.slide - 1;
            this.goToSlide(toSlide);
        },
        /**
         * Goes forward 1 slide.
         * 
         * @method goForward
         */
        goForward : function() {
            var toSlide;
            toSlide = this.slide + 1;
            this.goToSlide(toSlide);
        }
    };

}(window, window.jQuery));
