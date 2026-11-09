$(document).ready(function() {

    let divImg = $("#divImage");
    let option = $(".option");

    let divOpt1 = $("#divOpt1");
    let divOpt2 = $("#divOpt2");
    let divOpt3 = $("#divOpt3");

    let img1 = $("#img1");
    let img2 = $("#img2");
    let img3 = $("#img3");

    divImg.hover(
        function() {
            $(this).css({
                "transform": "scale(1.04)",
                "transition": "transform 0.3s ease-in-out" // Smooth scaling effect
            });
        },
        function() {
            $(this).css("transform", "scale(1)")
        }
    );

    option.hover(
        function(){
            $(this).css({
                "transform": "scale(1.04)",
                "backgroundColor": "rgb(7, 44, 128)"
            })
        },
        function(){+
            $(this).css({
                "transform": "scale(1)",
                "backgroundColor": "rgb(135, 182, 255)"
            })
           
        }
    
    )

    option.hover(
        function(){
            $(this).find("article").css("color", "white");
        },
        function(){
            $(this).find("article").css("color", "black");
        }
    )





    divOpt1.hover(  
        function(){
            img1.attr("src", "./CSS/Assets/Student Light.png")
        },
        function(){
            img1.attr("src","./CSS/Assets/Student Dark.png" )
        }

    );

    divOpt2.hover(
        function(){
            img2.attr("src", "./CSS/Assets/Librarian Light.png")
        },
        function(){
            img2.attr("src", "./CSS/Assets/Librarian Dark.png")
        }
    );

    divOpt3.hover(
        function(){
            img3.attr("src", "./CSS/Assets/Admin Light.png")
        },
        function(){
            img3.attr("src", "./CSS/Assets/Admin Dark.png")
        }
    );





})//end ng jquery