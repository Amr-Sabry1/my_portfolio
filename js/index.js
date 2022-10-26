$(document).ready(function() {
    $(".loader").fadeOut(3000, function() {
        $(".spiner").fadeOut(500)
        $("body").css("overflow", "auto")
    });

})

let aboutSection = $("#about").offset().top

$(window).scroll(function() {
    let windowScroll = $(window).scrollTop();

    if (windowScroll > aboutSection - 50) {
        $('nav .container').css("background-color", "black")
        $('nav .container').css({ "padding-left": "40px", "padding-right": "40px" })
        $(".iconarrow i").fadeIn(500)
    } else {
        $('nav .container').css("background-color", "rgba(0,0,0,0)")
        $('nav .container').css({ "padding-left": "0px", "padding-right": "0px" })

        $(".iconarrow i").fadeOut(500)

    }
})


$(".nav-item a").click(function(e) {
    let navClick = $(e.target).attr("href")
    $(e.target).css({ color: "yellow" });
    $(e.target).parent().siblings().children().css({ color: "white" })
    let sectionOffset = $(navClick).offset().top;
    $("html,body").animate({ scrollTop: sectionOffset })
})