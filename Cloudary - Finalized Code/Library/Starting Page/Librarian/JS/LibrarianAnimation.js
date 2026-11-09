
$(document).ready(function(){

    let imgClive = $("#imgClive");
    let secButtonsTop = $("#secButtonsTop");
    let secButtons = $(".secButtons");

    let secAddForm = $("#secAddForm");
    let btnAddBook = $("#btnAddBook");
    let btnSubmitBook = $("#btnSubmitBook");
    let btnCancelBook = $("#btnCancelBook")
    let tblBooks = $("#tblBooks");
    let tblBooksHistory = $("#tblBooksHistory");

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

    btnAddBook.click(function(){
        secAddForm.find("article").show();
        $(this).hide();
        
    })


    btnAddBook.add(btnSubmitBook).hover(
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

    btnCancelBook.hover(
        function(){
            $(this).css({
                "color": "white",
                "backgroundColor": " rgb(135, 0, 0)",
                "transform": "scale(1.04)"
            })
        },
        function(){
            $(this).css({
                "color": "black",
                "backgroundColor": "rgb(255, 135, 135)",
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

    
    tblBooks.find("tr > td > button:nth-child(2)").hover(
        function(){
            $(this).css({
                "color": "white",
                "backgroundColor": "rgb(47, 140, 50)",
                "transform": "scale(1.04)"
            })
        },
        function(){
            $(this).css({
                "color": "black",
                "backgroundColor": "rgb(135, 255, 143)",
                "transform": "scale(1)"
            })

        }
    )

    tblBooks.find("tr > td > button:nth-child(3)").hover(
        function(){
            $(this).css({
                "color": "white",
                "backgroundColor": "rgb(135, 0, 0)",
                "transform": "scale(1.04)"
            })
        },
        function(){
            $(this).css({
                "color": "black",
                "backgroundColor": " rgb(255, 135, 135)",
                "transform": "scale(1)"
            })

        }
    )


    tblBooksHistory.find("button").hover(
        function(){
            $(this).css({
                "color": "white",
                "backgroundColor": " rgb(135, 0, 0)",
                "transform": "scale(1.04)"
            })
        },
        function(){
            $(this).css({
                "color": "black",
                "backgroundColor": " rgb(255, 135, 135)",
                "transform": "scale(1)"
            })

        }
    )

})