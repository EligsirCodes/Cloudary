
$(document).ready(function(){
    let imgBackArrow = $("#imgBackArrow");
    let imgClive = $("#secRegisterPage #imgClive");
    let btnRegisterStudent = $("#btnRegisterStudent");

    
    let btnRegShowPass = $("#btnRegShowPass");
    let imgShowHidePass = $("#imgShowHidePass");
    let show = false;

    let btnRegConfShowPass = $("#btnRegConfShowPass")
    imgShowHideCon = $("#imgShowHideCon")
    let conShow = false;


    //SHOW HIDE BUTTON LISTENER - for icon change in the password form
    btnRegShowPass.click(function(){
        imgShowHidePass.css({
            "opacity": "0.2",
            "transition": "opacity 0.5s ease-in-out"
        });

        setTimeout(() => {
            if(show){
                imgShowHidePass.attr("src",  "./CSS/Assets/Show.png");
                btnRegShowPass.css("background-color", "rgb(135, 182, 255)")
                show = false;
            }else{
                imgShowHidePass.attr("src",  "./CSS/Assets/Hide.png");
                btnRegShowPass.css("background-color", "rgb(0, 41, 135)")
                show = true
            }
        imgShowHidePass.css("opacity", "1");
         }, 300); 
    })


    //SHOW HIDE BUTTON LISTENER - for icon change in the password confirm form
    btnRegConfShowPass.click(function(){
        imgShowHideCon.css({
            "opacity": "0.2",
            "transition": "opacity 0.5s ease-in-out"
        });

        setTimeout(() => {
            if(conShow){
                imgShowHideCon.attr("src",  "./CSS/Assets/Show.png");
                btnRegConfShowPass.css("background-color", "rgb(135, 182, 255)")
                 conShow = false;
            }else{
                imgShowHideCon.attr("src",  "./CSS/Assets/Hide.png");
                btnRegConfShowPass.css("background-color", "rgb(0, 41, 135)")
                conShow = true
            }
            imgShowHideCon.css("opacity", "1");
         }, 300); 
    })




    $("#btnBackToLoginStudent, #btnBackToLoginLibrarian, #btnBackToLoginAdmin").hover(
        function(){
            imgBackArrow.attr("src",  "./CSS/Assets/Back Arrow Light.png");
            $(this).css({
                "transform": "scale(1.05)",
                "backgroundColor":  "rgb(0, 41, 135)"
            })
        },
        function(){
            imgBackArrow.attr("src",  "./CSS/Assets/Back Arrow Dark.png");
            $(this).css({
                "transform": "scale(1)",
                  "backgroundColor":  "white"
            })
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


    // Register btn animation
    btnRegisterStudent.hover(
        function(){
            $(this).css({
                "color" : "white",
                "backgroundColor": "rgb(0, 41, 135)",
                "transform" : "scale(1.04)"
            })
            
        },
        function(){
            $(this).css({
                "color" : "black",
                "backgroundColor": "rgb(135, 182, 255)",
                "transform" : "scale(1)"
            })
        }

    )
})