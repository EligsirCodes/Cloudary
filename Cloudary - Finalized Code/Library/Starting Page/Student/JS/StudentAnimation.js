

$(document).ready(function(){

    let imgClive = $("#imgClive");
    let secButtonsTop = $("#secButtonsTop");
    let secButtons = $(".secButtons");
    let tblBooks = $("#tblBooks");
    let tblBorrowedBooks = $("#tblBorrowedBooks")


    //animation of logo and buttons
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

    secButtons.find("button").hover(
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

    tblBooks.find("tr > td > button").hover(
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


    tblBorrowedBooks.find("tr > td > button").hover(
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
}) 