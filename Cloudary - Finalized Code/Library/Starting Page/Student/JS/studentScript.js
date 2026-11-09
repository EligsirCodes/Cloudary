$(function() {
    accessFromLocalStorage();

    // Get the system time zone using built in Date() method
    let now = new Date();
    let time = now.toLocaleString();

    let $btnLogOutStudent = $("#btnLogOutStudent");

    let $btnSeeBooks = $("#btnSeeBooks");
    let $btnReturnBooks = $("#btnReturnBooks");

    let $tblBooks = $("#tblBooks");
    let $tblBorrowedBooks = $("#tblBorrowedBooks");

    // Text fields related to search feature
    let $txtSearchBookId = $("#txtSearchBookId");
    let $txtSearchBookTitle = $("#txtSearchBookTitle");
    let $txtSearchBookAuthor = $("#txtSearchBookAuthor");
    let $txtSearchBookCategory = $("#txtSearchBookCategory");
    let $selBookAvailability = $("#selBookAvailability"); //dropdown
    let $txtSearchBorrowedBookId = $("#txtSearchBorrowedBookId");
    let $txtSearchBorrowedBookTitle = $("#txtSearchBorrowedBookTitle");
    let $txtSearchBorrowedBookAuthor = $("#txtSearchBorrowedBookAuthor"); 
    let $txtSearchBorrowedBookCategory = $("#txtSearchBorrowedBookCategory"); 

    // Set the welcome header to the logged in user information
    $("#artName").text(`${currentLoggedIn.getLastName()}, ${currentLoggedIn.getFirstName()}`);
    $("#artID").text(`(ID: ${currentLoggedIn.getId()})`);

    $btnSeeBooks.click(function() {// Button to see library books
        hideAllSec(); // Hide all sections
        $("#secBot").show(); // Show secBot to ready the container
        $("#secBooksList").show(); // Show secBooksList to ready book list container
        displayBooks(); // Display all books to the table
        hideAllInputs(); // Hide all search inputs
    });

    $btnReturnBooks.click(function() {// Button to see borrowed books
        hideAllSec();
        $("#secBot").show();
        $("#secBorrowedBooksList").show();
        displayBorrowedBooks();
        hideAllInputs();
    });

    // Log Out Button
    $btnLogOutStudent.click(function() {

        $("#popupContainer").empty(); // Remove pop up container children
        $("#popupContainer").css({"display": "flex", "position": "fixed"}); //display container
        
        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container"); // Outer container inside container

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content"); // popupContent for container child
        let $popupMessage = $("<p>").text("Are you sure to Log Out?");

        // Function for the button yes of pop up container
        let $btnYes = $("<a>").attr("href", "/Starting Page/index.html").addClass("button-style").text("Yes").on("click", function() {
            Activities.push(new Activity(currentLoggedIn.getId(), currentLoggedIn.getEmail(), "Logged Out.", time)); // Record activity
            localStorage.removeItem("currentLoggedIn");
            saveToLocalStorage();
        });

        // Function for the button no
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        // Append the children
        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);
    });

    //SEARCHING 
    //Event listeners for search buttons on Books (show only relevant input)
    $("#btnSearchBookId, #btnSearchBookTitle, #btnSearchBookAuthor, #btnSearchBookCategory, #btnSearchBookAvailability").click(function() {
        hideAllInputs();
        displayBooks();
        $(".secSearchInputs").show(); //show the section to display inputs
        
        // Determine the corresponding input field per button
        let inputFieldList = {
            "btnSearchBookId": $txtSearchBookId,
            "btnSearchBookTitle": $txtSearchBookTitle,
            "btnSearchBookAuthor": $txtSearchBookAuthor,
            "btnSearchBookCategory": $txtSearchBookCategory,
            "btnSearchBookAvailability": $selBookAvailability
        };

        let inputField = inputFieldList[this.id];
        inputField.show().focus(); //show the input field then focus
    });

    // Search functions for each input (pass the search value as parameter)
    $txtSearchBookId.on("input", () => filterBooks(0, $txtSearchBookId.val()));
    $txtSearchBookTitle.on("input", () => filterBooks(1, $txtSearchBookTitle.val()));
    $txtSearchBookAuthor.on("input", () => filterBooks(2, $txtSearchBookAuthor.val()));
    $txtSearchBookCategory.on("input", () => filterBooks(3, $txtSearchBookCategory.val()));
    $selBookAvailability.on("change", () => filterBooks(4, $selBookAvailability.val()));

    //Event listeners for buttons on Books (show only relevant input)
    $("#btnSearchBorrowedBookId, #btnSearchBorrowedBookTitle, #btnSearchBorrowedBookAuthor, #btnSearchBorrowedBookCategory").click(function() {
        hideAllInputs();
        displayBorrowedBooks();
        $(".secSearchInputs").show(); //show the section to display inputs

        // Determine the corresponding input field per button
        let inputFieldList = {
            "btnSearchBorrowedBookId": $txtSearchBorrowedBookId,
            "btnSearchBorrowedBookTitle": $txtSearchBorrowedBookTitle,
            "btnSearchBorrowedBookAuthor": $txtSearchBorrowedBookAuthor,
            "btnSearchBorrowedBookCategory": $txtSearchBorrowedBookCategory,
        };

        let inputField = inputFieldList[this.id];
        inputField.show().focus(); //show the input field then focus
    });

    // Search functions for each input (pass the search value as parameter)
    $txtSearchBorrowedBookId.on("input", () => filterBorrowedBooks(0, $txtSearchBorrowedBookId.val()));
    $txtSearchBorrowedBookTitle.on("input", () => filterBorrowedBooks(1, $txtSearchBorrowedBookTitle.val()));
    $txtSearchBorrowedBookAuthor.on("input", () => filterBorrowedBooks(2, $txtSearchBorrowedBookAuthor.val()));
    $txtSearchBorrowedBookCategory.on("input", () => filterBorrowedBooks(3, $txtSearchBorrowedBookCategory.val()));

    //Display Books Function
    function displayBooks() {
        $tblBooks.empty();
        
        Books.forEach((book, index) => {//iterate through the list of books
            let $row = $("<tr></tr>");

            let fields = ["Id", "Title", "Author", "Category", "Availability"]; // List of fields to be displayed

            fields.forEach(field => { //iterate through the fields
                let $dataCell = $("<td></td>"); //create table data element
                let $span = $(`<span id="${field.toLowerCase()}-book-${index}"></span>`).text(book[`get${field}`]()); //insert the informations
                
                $dataCell.append($span); //append the span

                $row.append($dataCell); //append every cell to the row
            });

            // Actions Column
            let $actionData = $("<td></td>");
            let $borrowBtn = $(`<button id="borrow-book-${index}">Borrow Book</button>`);
            if (book.getAvailability() === "Borrowed") {
                $borrowBtn.hide(); //hide if book is borrowed
            } else {
                $borrowBtn.show(); //show if book is available
            }

            // Event Handlers
            $borrowBtn.click(() => borrowBook(index));

            // Append buttons
            $actionData.append($borrowBtn);
            $row.append($actionData);

            $tblBooks.append($row); //append row to the table
        });
    }

    // Function for displaying borrowed books
    function displayBorrowedBooks() {
        $tblBorrowedBooks.empty(); //empty table to avoid concatination
        let LoggedInStudent = null;

        //find currentLoggedIn's Id through the student's list
        for (let studentIndex = 0; studentIndex < Students.length; studentIndex++) {
            if (Students[studentIndex].getId() === currentLoggedIn.getId()) {
                LoggedInStudent = Students[studentIndex]; //assign the logged in student
                break;
            }
        }
        
        let studentBorrowedBooks = LoggedInStudent.getBorrowedBooks(); //see logged in student's borrowed books

        studentBorrowedBooks.forEach((borrowedBook, index) => { //iterate through the borrowed books
            let $row = $("<tr></tr>");

            let fields = ["Id", "Title", "Author", "Category"]; // List of fields to be displayed

            fields.forEach(field => { //Iterate through fields
                let $dataCell = $("<td></td>");
                let $span = $(`<span id="${field.toLowerCase()}-book-${index}"></span>`).text(borrowedBook[`get${field}`]());
                
                $dataCell.append($span);
                $row.append($dataCell);
            });

            // Actions Column
            let $actionData = $("<td></td>");
            let $returnBtn = $(`<button id="return-book-${index}">Return Book</button>`);
            $returnBtn.show();
            
            // Event Handlers
            $returnBtn.click(() => returnBook(borrowedBook.getId()));

            // Append buttons
            $actionData.append($returnBtn);
            $row.append($actionData);

            $tblBorrowedBooks.append($row);
        });
    }

    // Function for borrowing books
    function borrowBook(index) {

        // Confirmation popup for borrowing book
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});
    
        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Borrow Book ID: ${Books[index].getId()} ? `);

        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {

            Books[index].setAvailability(false); // Set Availability to borrowed
            Books[index].setBorrower(currentLoggedIn.getId()); // Set its borrower to the currently Logged In Student

            // Iterate through the students list
            for (let studentIndex = 0; studentIndex < Students.length; studentIndex++) {

                // If current Logged In match one of the students id, add the borrowed book
                if (Students[studentIndex].getId() === currentLoggedIn.getId()) { 
                    Students[studentIndex].addBorrowedBook(Books[index]);
                    break; // Break after meeting condition
                }
            }
            
            // Iterate through the librarian list and add the record to their borrowed book list
            for (let librarianIndex = 0; librarianIndex < Librarians.length; librarianIndex++) {
                Librarians[librarianIndex].addBorrowedBook(Books[index], 
                                                           currentLoggedIn.getId(), 
                                                           currentLoggedIn.getFullName(), 
                                                           "Borrowed");
            }

            // Record Activity  
            Activities.push(new Activity(currentLoggedIn.getId(), currentLoggedIn.getEmail(), "Borrowed Book ID: " + Books[index].getId(), time));

            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Borrowed Book!");

            // Close popup after pressing button okay
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);

            displayBooks(); // Display the books again
            saveToLocalStorage(); // Save the data to local storage
        });

        // If user clicks no, just close popup
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);

    }

    // Function for returning a book
    function returnBook(bookId) {

        $("#popupContainer").empty();
                
        //Pop up notify for successful Log In
        $("#popupContainer").css({"display": "flex", "position": "fixed"});

        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");

        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Return The Book ?`);

        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {
           
            // Find the book in Books[]
            let bookReturning = null;
            for (let bookIndex = 0; bookIndex < Books.length; bookIndex++) {
                if (Books[bookIndex].getId() == bookId) {
                    bookReturning = Books[bookIndex];
                    break;
                }
            }

            bookReturning.setAvailability(true); // Set Availability back to available
            bookReturning.setBorrower(null); // Remove its borrower

            // Iterate through the students list and get the logged in student's id
            for (let studentIndex = 0; studentIndex < Students.length; studentIndex++) {
                if (Students[studentIndex].getId() === currentLoggedIn.getId()) {

                    let borrowedBooks = Students[studentIndex].getBorrowedBooks();

                    // Find the book id being borrowed by the student and remove it from the list
                    for (let borrowedIndex = 0; borrowedIndex < Students[studentIndex].getBorrowedBooks().length; borrowedIndex++) {
                        if (borrowedBooks[borrowedIndex].getId() == bookId) {
                            Students[studentIndex].removeBorrowedBook(borrowedIndex);
                            break;
                        }
                    }
                }
            }
            
            // Add the returned book to the record history
            for (let librarianIndex = 0; librarianIndex < Librarians.length; librarianIndex++) {
                Librarians[librarianIndex].addReturnedBook(bookReturning, 
                                                            currentLoggedIn.getId(), 
                                                            currentLoggedIn.getFullName(), 
                                                            "Returned");
            }
            Activities.push(new Activity(currentLoggedIn.getId(), currentLoggedIn.getEmail(), "Returned Book ID: " + bookId, time));

            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Returned Book!");
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);

            displayBorrowedBooks();
            saveToLocalStorage();
        });


        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);
        
        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);

    }


    //Search function for displaying books
    function filterBooks(columnIndex, searchValue) {
        let $rows = $tblBooks.find("tr"); //find the table rows 

        $rows.each((index, row) => { //loop through the array of rows
            let $row = $(row); //assign each row to jquery object
            let $targetSearch = $row.find("td").eq(columnIndex); //find the data inside the column index (e.g. Book Id column)

            if ($targetSearch.length > 0) {
                let text = $targetSearch.text();

                if (text.toLowerCase().startsWith(searchValue.toLowerCase())) {
                    $row.show(); // Show row results
                } else {
                    $row.hide(); // Hide row results
                }
            }
        });
    }

    //Search function for displaying books history
    function filterBorrowedBooks(columnIndex, searchValue) {
        let $rows = $tblBorrowedBooks.find("tr");

        $rows.each((index, row) => {
            let $row = $(row);
            let $targetSearch = $row.find("td").eq(columnIndex);

            if ($targetSearch.length > 0) {
                let text = $targetSearch.text();

                if (text.toLowerCase().startsWith(searchValue.toLowerCase())) {
                    $row.show(); 
                } else {
                    $row.hide(); 
                }
            }
        });
    }

    //function hiding all inputs
    function hideAllInputs() {

        $(".secSearchInputs").hide(); //show the section to display inputs

        //hide all txt search fields
        $txtSearchBookId.hide();
        $txtSearchBookTitle.hide();
        $txtSearchBookAuthor.hide();
        $txtSearchBookCategory.hide();
        $selBookAvailability.hide();

        $txtSearchBorrowedBookId.hide();
        $txtSearchBorrowedBookTitle.hide();
        $txtSearchBorrowedBookAuthor.hide();
        $txtSearchBorrowedBookCategory.hide();


        // Clear values
        $txtSearchBookId.val("");
        $txtSearchBookTitle.val("");
        $txtSearchBookAuthor.val("");
        $txtSearchBookCategory.val("");
        $selBookAvailability.val("Available"); // Reset dropdown

        $txtSearchBorrowedBookId.val("");
        $txtSearchBorrowedBookTitle.val("");
        $txtSearchBorrowedBookAuthor.val("");
        $txtSearchBorrowedBookCategory.val("");

    }

    function hideAllSec() {
        $("#secBooksList, #secBorrowedBooksList").hide();
    }
    
    function saveToLocalStorage() {
        localStorage.setItem("userId", parseInt(userId)); 
        localStorage.setItem("Books", JSON.stringify(Books));
        localStorage.setItem("Users", JSON.stringify(Users));
        localStorage.setItem("Students", JSON.stringify(Students));
        localStorage.setItem("Librarians", JSON.stringify(Librarians));
        localStorage.setItem("Admins", JSON.stringify(Admins));
        localStorage.setItem("Activities", JSON.stringify(Activities));
        localStorage.setItem("currentLoggedIn", JSON.stringify(currentLoggedIn));

    }

    //Access necessary data from local storage
    function accessFromLocalStorage() {
        
        userId = parseInt(localStorage.getItem("userId"));
        Books = JSON.parse(localStorage.getItem("Books"));
        Users = JSON.parse(localStorage.getItem("Users"));
        Students = JSON.parse(localStorage.getItem("Students"));
        Librarians = JSON.parse(localStorage.getItem("Librarians"));
        Admins = JSON.parse(localStorage.getItem("Admins"));
        Activities = JSON.parse(localStorage.getItem("Activities"));
        currentLoggedIn = JSON.parse(localStorage.getItem("currentLoggedIn"));

        if (!userId) { userId = 1001; }
        if (!Books) { Books = []; }
        if (!Users) { Users = []; }
        if (!Students) { Students = []; }
        if (!Librarians) { Librarians = []; }
        if (!Admins) { Admins = []; }
        if (!Activities) { Activities = []; }
        currentLoggedIn = Object.assign(new Student(), currentLoggedIn);

        //Assign them again to their aligned objects
        Books.forEach((book, index) => {
            let bookInstance = new Book();
            Object.assign(bookInstance, book);
            Books[index] = bookInstance;
        });

        Users.forEach((user, index) => {
            let userInstance = new User();
            Object.assign(userInstance, user);
            Users[index] = userInstance;
        });

        Students.forEach((student, studentIndex) => {
            let studentInstance = new Student();
            Object.assign(studentInstance, student);
    
            // Convert each borrowed book into a Book instance
            studentInstance.getBorrowedBooks().forEach((borrowedBook, bookIndex) => {
                let borrowedBookInstance = new Book();
                Object.assign(borrowedBookInstance, borrowedBook);
                studentInstance.getBorrowedBooks()[bookIndex] = borrowedBookInstance;
            });
    
            Students[studentIndex] = studentInstance;
        });

        Librarians.forEach((librarian, index) => {
            let librarianInstance = new Librarian();
            Object.assign(librarianInstance, librarian);
            Librarians[index] = librarianInstance;
        });

        Admins.forEach((admin, index) => {
            let adminInstance = new Admin();
            Object.assign(adminInstance, admin);
            Admins[index] = adminInstance;
        });

        Activities.forEach((activity, index) => {
            let activityInstance = new Activity();
            Object.assign(activityInstance, activity);
            Activities[index] = activityInstance;
        });

    }

     //display pop up
     function showPopup() {
        $("#popupContainer").show();
    }

    //close pop up
    function closePopup() {
        $("#popupContainer").hide();
    }
});
