var slide = 1;

Slides = {
    showSlide : function(ev) {
        if (history.state != null && history.state != "") {
            slide = history.state;
            var px = "-" + $(window).height() * (slide - 1) + "";
            $("#slides").animate({
                top : px
            });
        }
    },
    handleKeyPress : function(ev) {
        var height;
        if (!$("#slides").is(":animated")) {
            if (ev.keyCode == 39) {
                if ($(document).height() > $(window).height()) {
                    height = $(window).height();
                    $("#slides").animate({
                        top : "-=" + height
                    });
                    slide += 1;
                    history.pushState(slide, "Slide " + slide, "#"
                            + slide);
                }
            } else if (ev.keyCode == 37) {
                if ($("#slides").css("top") < "0px") {
                    height = $(window).height();
                    $("#slides").animate({
                        top : "+=" + height
                    });
                    slide -= 1;
                    history.pushState(slide, "Slide " + slide, "#"
                            + slide);
                }
            }
        }
    },
    register : function() {
        console.log("At load : " + history.state);
        document.addEventListener("keyup", Slides.handleKeyPress);
        window.addEventListener("popstate", this.showSlide);
        this.showSlide();
    }
};
