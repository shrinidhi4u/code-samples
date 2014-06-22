(function(window, $) {

    'use strict';

    var slide = 1;

    window.Slides = function() {
        this.initialize.apply(this, arguments);
    };
    window.Slides.prototype = {
        initialize : function() {
            this.setupEvents();
            this.showSlide();
        },
        setupEvents : function() {
            var self = this;
            $(document).on("keyup", function(ev) {
                self.handleKeyPress(ev)
            });
            $(document).on("popstate", function(ev) {
                self.showSlide(ev)
            });
            $(document).on("click", function(evt) {
                if (evt.pageY < ($(window).height() / 2)) {
                    self.goBack();
                } else {
                    self.goForward();
                }
            });
            $(document).on("touchend", function(evt) {
                var yPos = evt.originalEvent.changedTouches[0].pageY;
                if (yPos < ($(window).height() / 2)) {
                    self.goBack();
                } else {
                    self.goForward();
                }
            });
            $(window).resize(function(ev) {
                clearTimeout($.data(this, 'resizeTimer'));
                $.data(this, 'resizeTimer', setTimeout(function() {
                    self.showSlide(ev);
                }, 250));
            });
        },
        showSlide : function(ev) {
            if (Modernizr.history && history.state != null
                    && history.state != "") {
                slide = history.state;
                var px = "-" + $(window).height() * (slide - 1) + "";
                $("#slides").animate({
                    top : px
                });
            }
        },
        handleKeyPress : function(ev) {
            if (!$("#slides").is(":animated")) {
                if (ev.keyCode == 39 || ev.keyCode == 40) {
                    // right or bottom arrow
                    this.goForward();
                } else if (ev.keyCode == 37 || ev.keyCode == 38) {
                    // left or top arrow
                    this.goBack();
                }
            }
        },
        goBack : function() {
            var height;
            if ($("#slides").css("top") < "0px") {
                height = $(window).height();
                $("#slides").animate({
                    top : "+=" + height
                });
                slide -= 1;
                history.pushState(slide, "Slide " + slide, "#" + slide);
            }
        },
        goForward : function() {
            var height;
            if ($(document).height() > $(window).height()) {
                height = $(window).height();
                $("#slides").animate({
                    top : "-=" + height
                });
                slide += 1;
                history.pushState(slide, "Slide " + slide, "#" + slide);
            }
        }
    };

}(window, window.jQuery));
