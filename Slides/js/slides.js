(function(window, $) {

    'use strict';

    window.Slides = function() {
        this.initialize.apply(this, arguments);
    };
    window.Slides.prototype = {
        initialize : function() {
            this.slide = 1;
            this.setupEvents();
            this.goToCurrentSlide();
        },
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
                if (evt.clientY < ($(window).height() / 2)) {
                    self.goBack();
                } else {
                    self.goForward();
                }
            });
            $win.on("touchend", function(evt) {
                var yPos = evt.originalEvent.changedTouches[0].clientY;
                if (yPos < ($(window).height() / 2)) {
                    self.goBack();
                } else {
                    self.goForward();
                }
            });
        },
        handleKeyPress : function(ev) {
            if (!$("#slides").is(":animated")) {
                if (ev.keyCode == 39 || ev.keyCode == 40 || ev.keyCode == 13) {
                    // right or bottom arrow or Enter
                    this.goForward();
                } else if (ev.keyCode == 37 || ev.keyCode == 38) {
                    // left or top arrow
                    this.goBack();
                }
            }
        },
        goToCurrentSlide : function() {
            var toSlide, hashStr;
            toSlide = 1;
            hashStr = window.location.hash;
            console.log(hashStr);
            if (hashStr && !isNaN(hashStr.substring(1))) {
                toSlide = parseInt(hashStr.substring(1));
            }
            this.goToSlide(toSlide);
        },
        goToSlide : function(toSlide, pushState) {
            if(pushState === undefined) {
                pushState = true;
            }
            if(!toSlide) {
                this.goToCurrentSlide();
            }

            if (isNaN(toSlide) || toSlide < 1
                    || toSlide > $('.slideWrapper').size()) {
                return;
            }
            var selector, el;
            $(".selected").removeClass('selected');
            selector = ".slideWrapper:eq(" + (toSlide - 1) + ")";
            $(selector).addClass("selected");
            this.slide = toSlide;
            if(pushState) {
                history.pushState(toSlide, "Slide " + toSlide, "#" + toSlide);
            }
        },
        goBack : function() {
            var toSlide;
            toSlide = this.slide - 1;
            this.goToSlide(toSlide);
        },
        goForward : function() {
            var toSlide;
            toSlide = this.slide + 1;
            this.goToSlide(toSlide);
        }
    };

}(window, window.jQuery));
