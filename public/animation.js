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


    //interval = setInterval(function () {
    //    console.log("++++++++")
    //    if (swiping) {
    //        return;
    //    }
    //    swiping = true;
    //
    //    actualIndex++;
    //    if (actualIndex >= $slides.length) {
    //        actualIndex = 0;
    //    }
    //
    //    updateSlides(actualIndex);
    //}, 10000);


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


var item_id = "0"


function display(id, color1, color2){



    if(item_id != "0") {
        $("#f_item_" + item_id + " span:nth-child(1)").css("display", "inline");
        $("#f_item_" + item_id + " span:nth-child(2)").css("display", "none");
        $("#f_item_" + item_id + " .panel-body").css("color", $("#f_item_" + item_id + " .panel-body").css("backgroundColor"));
        $("#f_item_" + item_id + " .panel-body").css("backgroundColor", color2);
        $("#f_item_" + item_id + " .panel-footer:first").slideUp("fast");
        item_id = "0";
    }



    //$("#f_item_" + id + " .panel-body:first").css("display", "none");







if($("#f_item_" + id + " .panel-footer:first").css("display") == "none") {

    $("#f_item_" + id + " span:nth-child(1)").css("display", "none");
    $("#f_item_" + id + " span:nth-child(2)").css("display", "inline");
    $("#f_item_" + id + " .panel-body").css("backgroundColor", color1);
    $("#f_item_" + id + " .panel-body").css("color", "#ffffff");
    $("#f_item_" + id + " .panel-footer:first").slideDown("fast");
    item_id = id;
} else {
    $("#f_item_" + id + " span:nth-child(1)").css("display", "inline");
    $("#f_item_" + id + " span:nth-child(2)").css("display", "none");
    $("#f_item_" + id + " .panel-body").css("backgroundColor", color2);
    $("#f_item_" + id + " .panel-body").css("color", color1);
    $("#f_item_" + id + " .panel-footer:first").slideUp("fast");
    item_id = "0";
}





    //$("#f_item_1").style.backgroundColor = "#337ab7";


    //var target1=document.getElementById("f_item2_" + id);
    //var target2=document.getElementById("f_item3_" + id);
    //var target3=document.getElementById("f_item4_" + id);
    //
    //
    //if(target3.style.display=="none"){
    //
    //    target.style.backgroundColor = "#337ab7";
    //    target.style.color = "#ffffff";
    //    target2.style.display="block";
    //    target1.style.display="none";
    //    item_id = id;
    //    $("#f_item4_" + id).slideDown("fast");
    //}else{
    //    target.style.backgroundColor = "#e5e5e5";
    //    target.style.color = "#337ab7";
    //    target2.style.display="none";
    //    target1.style.display="block";
    //    item_id = "0";
    //    $("#f_item4_" + id).slideUp("fast");
    //
    //}



}



function changeStyle(id) {


    $("#" + id + " h3:first").css("color", "#483d8b");
    $("#" + id + " img:first").css("backgroundColor", "#D1D1D1");
    $("#" + id + " p:first").css("color", "#ffffff");
    $("#" + id + " p:first").css("backgroundColor", "#483d8b");

    $("#" + id + " h3:first").fadeIn("slow");

    console.log("sss1")
}

function changeStyle1(id) {

    $("#" + id + " h3:first").css("color", "#483d8b");
    $("#" + id + " img:first").css("backgroundColor", "#483d8b");
    $("#" + id + " p:first").css("color", "#909090");
    $("#" + id + " p:first").css("backgroundColor", "#ffffff");
    $("#" + id + " h3:first").fadeIn("slow");
    console.log("sss2")
}