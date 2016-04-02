/**
 * Created by zhenghui on 10/27/15.
 */


    $(function () {
        var $navDots = $("#hero nav a")
        var $next = $(".slide-nav.next");
        var $prev = $(".slide-nav.prev");
        var $slides = $("#hero .slides .slide");
        var actualIndex = 0;
        var swiping = false;
        var interval;

        $navDots.click(function (e) {
            e.preventDefault();
            if (swiping) {
                return;
            }
            swiping = true;

            actualIndex = $navDots.index(this);
            updateSlides(actualIndex);
        });

        $next.click(function (e) {
            e.preventDefault();
            if (swiping) {
                return;
            }
            swiping = true;

            clearInterval(interval);
            interval = null;

            actualIndex++;
            if (actualIndex >= $slides.length) {
                actualIndex = 0;
            }

            updateSlides(actualIndex);
        });

        $prev.click(function (e) {
            e.preventDefault();
            if (swiping) {
                return;
            }
            swiping = true;

            clearInterval(interval);
            interval = null;

            actualIndex--;
            if (actualIndex < 0) {
                actualIndex = $slides.length - 1;
            }

            updateSlides(actualIndex);
        });

        function updateSlides(index) {
            // update nav dots
            $navDots.removeClass("active");
            $navDots.eq(index).addClass("active");

            // update slides
            var $activeSlide = $("#hero .slide.active");
            var $nextSlide = $slides.eq(index);

            $activeSlide.fadeOut();
            $nextSlide.addClass("next").fadeIn();

            setTimeout(function () {
                $slides.removeClass("next").removeClass("active");
                $nextSlide.addClass("active");
                $activeSlide.removeAttr('style');
                swiping = false;
            }, 1000);
        }


        interval = setInterval(function () {
            if (swiping) {
                return;
            }
            swiping = true;

            actualIndex++;
            if (actualIndex >= $slides.length) {
                actualIndex = 0;
            }

            updateSlides(actualIndex);
        }, 5000);

        // demo player
        var $videoModal = $(".video-modal");
        $("#demo-player").click(function () {
            $videoModal.toggleClass("active");
            clearInterval(interval);
            interval = null;
        });


        $videoModal.click(function () {
            $videoModal.removeClass("active");
            setTimeout(function () {
                $videoModal.find(".wrap").html();
            }, 1000);
        })
        $videoModal.find(".wrap").click(function (e) {
            e.stopPropagation();
        });
    });





