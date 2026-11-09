$(document).ready(function(){

    let btnLogIn = $("#btnLogIn");
    let btnBackToLoginMenu = $("#btnBackToLoginMenu");
    let imgBackArrow = $("#imgBackArrow");
    let imgClive = $("#headerUserLogIn #imgClive");
    let artSignUp = $("#artSignUp");

    let btnLogShowPass = $("#btnLogShowPass");
    let imgShowHide = $("#imgShowHide");
    let show = false;

    btnLogShowPass.click(function(){
        imgShowHide.css({
            "opacity": "0.2",
            "transition": "opacity 0.5s ease-in-out"
        });

        setTimeout(() => {
            if (show){
                imgShowHide.attr("src",  "./CSS/Assets/Show.png");
                btnLogShowPass.css("background-color", "rgb(135, 182, 255)");
                show = false;
            } else { 
                imgShowHide.attr("src",  "./CSS/Assets/Hide.png");
                btnLogShowPass.css("background-color", "rgb(0, 41, 135)");
                show = true
            }
        imgShowHide.css("opacity", "1");
         }, 300); 
    });
    
    //back btn animation
    btnBackToLoginMenu.hover(
        function(){
            imgBackArrow.attr("src",  "./CSS//Assets/Back Arrow Light.png");
            $(this).css({
                "transform": "scale(1.05)",
                "backgroundColor":  "rgb(0, 41, 135)"
            });
        },
        function(){
            imgBackArrow.attr("src",  "./CSS//Assets/Back Arrow Dark.png");
            $(this).css({
                "transform": "scale(1)",
                  "backgroundColor":  "white"
            });
        }
    )

    //logo animation
    imgClive.hover(
        function(){
            $(this).css("transform", "scale(1.04)")
        },
        function(){
            $(this).css("transform", "scale(1)")
        }

    )
    

    btnLogIn.hover(
        function(){
            $(this).css({
                "color": "white",
                "backgroundColor": " rgb(0, 41, 135)",
                "transform": "scale(1.04)",
            });
        },
        function(){
            $(this).css({
                "color": "black",
                "backgroundColor": "rgb(135, 182, 255)",
                "transform": "scale(1)",
            });
        }
    )

    artSignUp.hover(
        function(){
            $(this).find("a").css({
                "transform": "scale(1.02)",
                "color": "rgb(0, 41, 135)"
            });
        },
        function(){
            $(this).find("a").css({
                "transform": "scale(1)",
                "color": "rgb(135, 182, 255)"
            });
        }
    )


})