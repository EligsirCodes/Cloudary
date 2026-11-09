$(function() {

    let bookId = 1001;

    accessFromLocalStorage();

    //Get the system time zone using built in Date() method
    let now = new Date();
    let time = now.toLocaleString();
    
    //buttons for features/functions
    let $btnLogOutLibrarian = $("#btnLogOutLibrarian");
    let $btnManageBooks = $("#btnManageBooks");
    let $btnShowBookHistory = $("#btnShowBookHistory");
    let $btnAddBook = $("#btnAddBook");
    let $btnSubmitBook = $("#btnSubmitBook");
    let $btnCancelBook = $("#btnCancelBook");
    let $btnClearBookHistory = $("#btnClearBookHistory");

    //text fields related to search feature
    let $txtSearchBookId = $("#txtSearchBookId");
    let $txtSearchBookTitle = $("#txtSearchBookTitle");
    let $txtSearchBookAuthor = $("#txtSearchBookAuthor");
    let $txtSearchBookCategory = $("#txtSearchBookCategory");
    let $selBookAvailability = $("#selBookAvailability"); //dropdown
    let $txtSearchBookHistoryId = $("#txtSearchBookHistoryId");
    let $txtSearchStudentId = $("#txtSearchStudentId");
    let $selBookActivity = $("#selBookActivity"); //dropdown

    //sections with separate contents
    let $secBot = $("#secBot");
    let $secNewBook = $("#secNewBook");
    let $secBooksList = $("#secBooksList");
    let $secBookHistory = $("#secBookHistory");
    let $secSearchInputs = $(".secSearchInputs");

    //text fields for entering new book
    let $txtTitle = $("#txtTitle");
    let $txtAuthor = $("#txtAuthor");
    let $txtCategory = $("#txtCategory");

    //tabel variables
    let $tblBooks = $("#tblBooks");
    let $tblBooksHistory = $("#tblBooksHistory");

    // Set the welcome header to the logged in user information
    $("#artName").text(`${currentLoggedIn.getLastName()}, ${currentLoggedIn.getFirstName()}`);
    $("#artID").text(`(ID: ${currentLoggedIn.getId()})`);

    //buttons for librarian
    $btnLogOutLibrarian.click(function() { //log out button function

        // Confirmation popup for deleting book
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});

        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Log Out ? `);
 
        let $btnYes = $("<a>").attr("href", "/Starting Page/index.html").addClass("button-style").text("Yes").on("click", function() {

            localStorage.removeItem("currentLoggedIn"); //remove currentLoggedIn
            Activities.push(new Activity(currentLoggedIn.getId(), currentLoggedIn.getEmail(), "Logged Out.", time)); //log activity
            saveToLocalStorage(); //save to local storage

        });
        
        // If user clicks no, just close popup
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);
    });

    $btnManageBooks.click(function() { //show books list to manage books
        $secBot.show(); // Show secBot to ready the container
        $secBooksList.show(); //display
        $secSearchInputs.hide();
        $secBookHistory.hide(); //hide section
        displayBooks();  //display books dynamically
        hideAllInputs(); //hide all search inputs
    });

    $btnShowBookHistory.click(function() { //show books history
        $secBot.show();
        $secBookHistory.show();
        $secBooksList.hide();
        $secSearchInputs.hide();
        displayBooksHistory(); 
        hideAllInputs();
    });

    $btnAddBook.click(function() { //button for adding new book
        $secNewBook.show();
        $("#imgSeparator").show();
        $("#artButtons").show();
        $btnAddBook.hide();
    });

    $btnSubmitBook.click(function() { //button for inserting the new book
        addBook(); //function for adding new books
    });

    $btnCancelBook.click(function() { //cancel adding new book
        $secNewBook.hide();
        $btnAddBook.show();
        $("#imgSeparator").hide();
        $("#artButtons").hide();
        clearAllFields(); //clear all text fields
    });

    $btnClearBookHistory.click(function() { // Clear book adding new book
        clearBookHistory();
    });

    //Event listeners for buttons on Books (show only relevant input)
    $("#btnSearchBookId, #btnSearchBookTitle, #btnSearchBookAuthor, #btnSearchBookCategory, #btnSearchBookAvailability").click(function() {
        hideAllInputs();
        displayBooks();
        $secSearchInputs.show();

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

    //Search feature Book History (show only relevant input)
    $("#btnSearchBookHistoryId, #btnSearchStudentId, #btnSearchBookHistoryActivity").click(function() {
        hideAllInputs();
        displayBooksHistory();
        $secSearchInputs.show();
        
        let inputFieldList = {
            "btnSearchBookHistoryId": $txtSearchBookHistoryId,
            "btnSearchStudentId": $txtSearchStudentId,
            "btnSearchBookHistoryActivity": $selBookActivity
        };

        let inputField = inputFieldList[this.id];
        inputField.show().focus(); 
    });

    $txtSearchBookHistoryId.on("input", () => filterBooksHistory(0, $txtSearchBookHistoryId.val()));
    $txtSearchStudentId.on("input", () => filterBooksHistory(1, $txtSearchStudentId.val()));
    $selBookActivity.on("change", () => filterBooksHistory(6, $selBookActivity.val()));


    //function for adding book
    function addBook() {
        try {
            //Check for invalid inputs
            if(!$txtTitle.val() && !$txtAuthor.val() && !$txtCategory.val()) { throw new Validation("Please Enter Book Details First."); }
            if(!$txtTitle.val()) { throw new Validation("Please Enter Book Title."); }
            if(!$txtAuthor.val()) { throw new Validation("Please Enter Book Author."); }
            if(!$txtCategory.val()) { throw new Validation("Please Enter Book Category."); }

            //Check for duplicate id (increase if it duplicates)
            for (let index = 0; index < Books.length; index++) {
                if (Books[index].getId() == bookId) {
                    bookId++;
                }
            }
            
            let newBook = new Book(bookId, $txtTitle.val(), $txtAuthor.val() , $txtCategory.val(), true);

            Activities.push(new Activity(currentLoggedIn.getId(), currentLoggedIn.getEmail(), "Added Book ID : " + bookId, time)); 

            newBook.setAddedBy(currentLoggedIn.getId()); //set who added the book
            
            Books.push(newBook); //Add new book

            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            // Clive mascot
            let $clive = $("<img>");
            $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Added Book!");

            // Close popup after pressing button okay
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);

            saveToLocalStorage();
            clearAllFields();
            displayBooks();

        } catch (err) { //error handling alert if error occurred
            alert(err.message);
            
        }

    }

    //function display book
    function displayBooks() {
        $tblBooks.empty(); //reset tabel books

        Books.forEach((book, index) => {
            let $row = $("<tr></tr>");
    
            //List of fields to be displayed
            let fields = ["Id", "Title", "Author", "Category", "Availability"];
            let inputFields = ["Title", "Author", "Category"]; // Editable fields
            
            //Iterate through each data
            fields.forEach((field) => {
                let $dataCell = $("<td></td>");
                let $span = $(`<span id="${field.toLowerCase()}-book-${index}"></span>`).text(book[`get${field}`]());
    
                $dataCell.append($span); //append span in the data cell
    
                //Add input field for editable fields
                if (inputFields.includes(field)) { 
                    let $input = $(`<input id="edit-${field.toLowerCase()}-${index}" type="text">`).val(book[`get${field}`]());
                    $input.hide();
                    $dataCell.append($input);
                }
    
                $row.append($dataCell); //append data cells inside the row
            });
    
            //Actions Column
            let $actionData = $("<td></td>");

            //edit button
            let $editBtn = $(`<button id="edit-book-${index}">Edit Book</button>`);
            if (book.getAvailability() == "Borrowed") {
                $editBtn.hide(); //hide edit button if book is borrowed
            } else { //show edit button if book is available
                $editBtn.show();
            }

            //save button
            let $saveBtn = $(`<button id="save-book-${index}" >Save Book</button>`);
            $saveBtn.hide();

            //delete button
            let $deleteBtn = $(`<button id="delete-book-${index}" >Delete Book</button>`);
            if (book.getAvailability() == "Borrowed") { 
                $deleteBtn.hide(); //hide delete button if book is borrowed
            } else { //show edit button if book is available
                $deleteBtn.show();
            }

            // Event Handlers
            $editBtn.click(() => editBook(index));
            $saveBtn.click(() => saveBook(index));
            $deleteBtn.click(() => deleteBook(index));
    
            // Append buttons
            $actionData.append($editBtn, $saveBtn, $deleteBtn);
            $row.append($actionData);
    
            $tblBooks.append($row); //append the row to tabel books to display
        });
    }

    function displayBooksHistory() {
        $tblBooksHistory.empty(); // Clear previous entries

        // Get borrowed and returned books from the Librarian (adjust if needed)
        let borrowedAndReturnedBooks = currentLoggedIn.getBorrowedAndReturnedBooks();

        borrowedAndReturnedBooks.forEach((item, index) => {
            let $row = $("<tr></tr>");

            // Extract book and borrower details
            let borrowedBook = item.book; //get book entry object
            let borrowerId = item.borrowerId || item.returnerId; //get borrower's/returner's id
            let borrowerName = item.borrowerName || item.returnerName; // get borrower's/returner's name
            let activity = item.activity;

            // List of fields to display
            let values = [
                borrowedBook._id,         // Book ID
                borrowedBook._title,      // Title
                borrowedBook._author,     // Author
                borrowedBook._category,   // Category
                borrowerId,               // Borrower's ID
                borrowerName,             // Borrower's Full Name
                activity
            ];

            values.forEach((value) => {
                let $dataCell = $("<td></td>").text(value);
                $row.append($dataCell);
            });

            // Actions Column
            let $actionData = $("<td></td>");
            let $deleteBtn = $(`<button id="delete-book-history-${index}">Delete</button>`).show();

            // Event Handler for Deletion
            $deleteBtn.click(() => deleteBookHistory(index));

            // Append buttons
            $actionData.append($deleteBtn);
            $row.append($actionData);

            $tblBooksHistory.append($row);
        });
    }

    //function for editing books
    function editBook(index){
        let fields = ["title", "author", "category"]; //book fields

        fields.forEach(field => { //iterate through field to edit specific row
            $(`#${field}-book-${index}`).hide();
            $(`#edit-${field}-${index}`).show();
        });

        $(`#edit-book-${index}`).hide(); //hide the edit, 
        $(`#save-book-${index}`).css("background-color", "lightgreen").show(); //show the save button
    }



    //function for saving the new edited book
    function saveBook(index){

        let newTitle = $(`#edit-title-${index}`).val();
        let newAuthor = $(`#edit-author-${index}`).val();
        let newCate = $(`#edit-category-${index}`).val();
    
        if (!newTitle || !newAuthor || !newCate) {
            alert("Please enter all details necessary before saving.");
            return;
        }   

        Books[index].setTitle(newTitle);
        Books[index].setAuthor(newAuthor);
        Books[index].setCategory(newCate);

        displayBooks();
        saveToLocalStorage();
    }

    //function for deleting book
    function deleteBook(index) {

        // Confirmation popup for deleting book
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});

        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Delete Book ID: ${Books[index].getId()} ? `);
 
        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {

            Activities.push(new Activity(currentLoggedIn.getId(), currentLoggedIn.getEmail(), "Deleted Book ID : " + Books[index].getId(), time));
            Books.splice(index, 1);
            
            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Deleted Book!");

            // Close popup after pressing button okay
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);

            displayBooks();
            saveToLocalStorage();
        });
        
        // If user clicks no, just close popup
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);

    }

    //function for deleting specific book history
    function deleteBookHistory(index) {

        // Confirmation popup for deleting book
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});

        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Delete Book History Record ${++index} ? `);
 
        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {
            
            //Iterate through all librarian to delete book history
            for (let librarianIndex = 0; librarianIndex < Librarians.length; librarianIndex++) {
                Librarians[librarianIndex].getBorrowedAndReturnedBooks().splice(index, 1);
            }
            currentLoggedIn.getBorrowedAndReturnedBooks().splice(index, 1);
            displayBooksHistory();
            saveToLocalStorage();
            closePopup();
        });
        
        // If user clicks no, just close popup
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
    function filterBooksHistory(columnIndex, searchValue) {
        let $rows = $tblBooksHistory.find("tr");

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

    function clearBookHistory() {

        // Confirmation popup for borrowing book
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});
    
        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Clear Book History ? `);

        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {

            currentLoggedIn.setBorrowedAndReturnedBooks();
            for (let librarianIndex = 0; librarianIndex < Librarians.length; librarianIndex++) {
                Librarians[librarianIndex].setBorrowedAndReturnedBooks();
            }

            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Cleared Book History!");

            // Close popup after pressing button okay
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);

            saveToLocalStorage();
            displayBooksHistory();

        });

        // If user clicks no, just close popup
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);

    }

    //function hiding all inputs
    function hideAllInputs() {

        //hide all txt search fields
        $txtSearchBookId.hide();
        $txtSearchBookTitle.hide();
        $txtSearchBookAuthor.hide();
        $txtSearchBookCategory.hide();
        $selBookAvailability.hide();

        $txtSearchBookHistoryId.hide();
        $txtSearchStudentId.hide();
        $selBookActivity.hide();


        // Clear values
        $txtSearchBookId.val("");
        $txtSearchBookTitle.val("");
        $txtSearchBookAuthor.val("");
        $txtSearchBookCategory.val("");
        $selBookAvailability.val("Available"); // Reset dropdown

        $txtSearchBookHistoryId.val("");
        $txtSearchStudentId.val("");
        $selBookActivity.val("Borrowed");

    }

    //Clear all text fields of adding book
    function clearAllFields() {
        $txtTitle.val("");
        $txtAuthor.val("");
        $txtCategory.val("");

    }

    //function saving to local storage
    function saveToLocalStorage() {
        localStorage.setItem("bookId", parseInt(bookId)); 
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
        
        bookId = parseInt(localStorage.getItem("bookId"));
        Books = JSON.parse(localStorage.getItem("Books"));
        Users = JSON.parse(localStorage.getItem("Users"));
        Students = JSON.parse(localStorage.getItem("Students"));
        Librarians = JSON.parse(localStorage.getItem("Librarians"));
        Admins = JSON.parse(localStorage.getItem("Admins"));
        Activities = JSON.parse(localStorage.getItem("Activities"));
        currentLoggedIn = JSON.parse(localStorage.getItem("currentLoggedIn"));

        if (!bookId) { bookId = 1001; }
        if (!Books) { Books = []; }
        if (!Users) { Users = []; }
        if (!Students) { Students = []; }
        if (!Librarians) { Librarians = []; }
        if (!Admins) { Admins = []; }
        if (!Activities) { Activities = []; }
        currentLoggedIn = Object.assign(new Librarian(), currentLoggedIn);
 
        
        //Assign them again to their aligned object instance
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

        Students.forEach((student, index) => {
            let studentInstance = new Student();
            Object.assign(studentInstance, student);
            Students[index] = studentInstance;
        });

        Librarians.forEach((librarian, index) => {
            let librarianInstance = new Librarian();
            Object.assign(librarianInstance, librarian);

            // Convert each borrowed book into a Book instance
            librarianInstance.getBorrowedAndReturnedBooks().forEach((borAndRetBook, bookIndex) => {
                let borAndRetBookInstance = new Book();
                Object.assign(borAndRetBookInstance, borAndRetBook);
                librarianInstance.getBorrowedAndReturnedBooks()[bookIndex] = borAndRetBookInstance;
            });


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

