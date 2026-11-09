
$(document).ready(function(){
  

    let imgClive = $("#imgClive");
    let secButtonsTop = $("#secButtonsTop");

    let secBtnTop = $("#secBtnTop");
    let secBtnBot = $("#secBtnBot");
    let tblStudents = $("#tblStudents");
    let tblLibrarians = $("#tblLibrarians");
    let tblBooks = $("#tblBooks");
    let tblActions = $("#tblActions");

    let secButtonsAltFormat = $(".secButtonsAltFormat");


    imgClive.hover(
        function(){
            $(this).css("transform", "scale(1.05)")
        },
        function(){
            $(this).css("transform", "scale(1)")
        }

    )


    secButtonsTop.find("button").hover(
        function(){
            $(this).css({
                "color": "white",
                "backgroundColor": "rgb(0, 41, 135)",
                "transform": "scale(1.04)"
            })
        },
        function(){
            $(this).css({
                "color": "black",
                "backgroundColor": "rgb(135, 182, 255)",
                "transform": "scale(1)"
            })

        }

    )




    secBtnTop.find("button, #secBtnBot button").hover(
        function() {
        
            $(this).css({
                "color": "white",
                "background-color": "rgb(0, 41, 135)",
                "transform": "scale(1.04)"
            });
        },
        function() {
           
            $(this).css({
                "color": "black",
                "background-color": " rgb(135, 182, 255)",
                "transform": "scale(1)"
            });
        }
    )



   

    tblStudents.find("tr > td > button").hover(
        function() {
  
            $(this).css({
            "color": "white",
            "background-color": "rgb(0, 41, 135)",
            "transform": "scale(1.04)"
            });
         },
        function() {
             $(this).css({
            "color": "black",
            "background-color": "rgb(135, 182, 255)",
            "transform": "scale(1)"
            });
         }
    );

    tblStudents.find("tr > td > button:nth-child(2)").hover( // Target the second button in each row
        function() {
            $(this).css("background-color", "rgb(47, 140, 50)");
        },
        function() {
            $(this).css("background-color", "rgb(135, 255, 143)");
        }
    );
    
    tblStudents.find("tr > td > button:nth-child(3)").hover( // Target the third button in each row
        function() {
            $(this).css("background-color", "rgb(135, 0, 0)");
        },
        function() {
            $(this).css("background-color", "rgb(255, 135, 135)");
        }
    );


  

    secButtonsAltFormat.find("button").hover(
         function() {
     
            $(this).css({
                "color": "white",
                "background-color": "rgb(0, 41, 135)",
                "transform": "scale(1.04)"
            });
        },
        function() {
    
            $(this).css({
                "color": "black",
                 "background-color": "rgb(135, 182, 255)",
                "transform": "scale(1)"
            });
         }
    );

    ///////////////////////////////


    tblLibrarians.find("tr > td > button").hover(
        function() {
  
            $(this).css({
            "color": "white",
            "background-color": "rgb(0, 41, 135)",
            "transform": "scale(1.04)"
            });
         },
        function() {
             $(this).css({
            "color": "black",
            "background-color": "rgb(135, 182, 255)",
            "transform": "scale(1)"
            });
         }
    );

    tblLibrarians.find("tr > td > button:nth-child(2)").hover( // Target the second button in each row
        function() {
            $(this).css("background-color", "rgb(47, 140, 50)");
        },
        function() {
            $(this).css("background-color", "rgb(135, 255, 143)");
        }
    );
    
    tblLibrarians.find("tr > td > button:nth-child(3)").hover( // Target the third button in each row
        function() {
            $(this).css("background-color", "rgb(135, 0, 0)");
        },
        function() {
            $(this).css("background-color", "rgb(255, 135, 135)");
        }
    );



    tblBooks.find("tr > td > button").hover(
        function() {
            // Mouse enter
            $(this).css({
                "color": "white",
                "background-color": "rgb(135, 0, 0)",
                "transform": "scale(1.04)"
            });
        },
        function() {
            // Mouse leave
            $(this).css({
                "color": "black",
                "background-color": "rgb(255, 135, 135)",
                "transform": "scale(1)"
            });
        }
    );

    tblActions.find("tr > td > button").hover(
        function() {
            // Mouse enter
            $(this).css({
                "color": "white",
                "background-color": "rgb(135, 0, 0)",
                "transform": "scale(1.04)"
            });
        },
        function() {
            // Mouse leave
            $(this).css({
                "color": "black",
                "background-color": "rgb(255, 135, 135)",
                "transform": "scale(1)"
            });
        }
    );
})