// $(function(){
//     $(".container").on("mouseenter",function(){
//         $(".card").stop().animate({
//             top:"-90px"
//         },"slow");
//     }).on("mouseleave", function(){
//         $(".card").stop().animate({
//             top:0
//         }, "slow");
//     });
// });

$(function(){
    $(".container").on({
        mouseenter: function() {
            $(this).find(".card").stop().animate({
                top:"-90px"
            },"slow");
        },
        mouseleave: function() {
            $(this).find(".card").stop().animate({
                top:"0"
            }, "slow");
        },
        touchstart: function() { 
            $(this).find(".card").stop().animate({ top: "-90px" }, "slow");
        },
        touchend: function() { 
            $(this).find(".card").stop().animate({ top: "0" }, "slow");
        }
    });
});