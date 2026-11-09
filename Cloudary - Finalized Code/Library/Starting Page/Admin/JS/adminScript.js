$(function() {
    accessFromLocalStorage();

    //Display the info of the logged in user on the interface
    let userInfo = `<p>Logged in as: <strong>${currentLoggedIn.getLastName()}, ${currentLoggedIn.getFirstName()}</strong> (ID: ${currentLoggedIn.getId()})</p>`;
    $("#secAdminPage").prepend(userInfo);

    let regex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/; //Email format
    let acaYearFormat = /^\d{4}-\d{4}$/; //Academic Year Format

    let $btnLogOutAdmin = $("#btnLogOutAdmin");

    let $btnManageStudents = $("#btnManageStudents");
    let $btnManageLibrarian = $("#btnManageLibrarian");
    let $btnManageBookHistory = $("#btnManageBookHistory");
    let $btnManageActivityHistory = $("#btnManageActivityHistory");
    let $btnClearActivityHistory = $("#btnClearActivityHistory");

    let $secStudentHistory = $("#secStudentHistory");
    let $secLibrarianHistory = $("#secLibrarianHistory");
    let $secBooks = $("#secBooks");
    let $secActivityHistory = $("#secActivityHistory");
    let $secSearchInputs = $(".secSearchInputs");
    let $secBot = $("#secBot");

    let $tblStudents = $("#tblStudents");
    let $tblLibrarians = $("#tblLibrarians");
    let $tblBooks = $("#tblBooks");
    let $tblActions = $("#tblActions");

    //text fields related to search feature of student
    //,librarian, book, and activity
    let $txtSearchStudentId = $("#txtSearchStudentId");
    let $txtSearchStudentFirstName = $("#txtSearchStudentFirstName");
    let $txtSearchStudentLastName = $("#txtSearchStudentLastName"); 
    let $txtSearchYearLevel = $("#txtSearchYearLevel"); 
    let $selProgram = $("#selProgram");
    let $txtSearchAcademicYear = $("#txtSearchAcademicYear");
    let $txtSearchStudentEmail = $("#txtSearchStudentEmail");
    
    let $txtSearchLibrarianId = $("#txtSearchLibrarianId");
    let $txtSearchLibrarianFirstName = $("#txtSearchLibrarianFirstName"); //dropdown
    let $txtSearchLibrarianLastName = $("#txtSearchLibrarianLastName");
    let $txtSearchLibrarianEmail = $("#txtSearchLibrarianEmail");
    
    let $txtSearchBookId = $("#txtSearchBookId");
    let $txtSearchBookTitle = $("#txtSearchBookTitle");
    let $txtSearchBookAuthor = $("#txtSearchBookAuthor");
    let $txtSearchBookCategory = $("#txtSearchBookCategory");
    let $selBookAvailability = $("#selBookAvailability"); //dropdown

    let $txtSearchUserId = $("#txtSearchUserId"); 
    let $txtSearchUserEmail = $("#txtSearchUserEmail"); 
    let $txtSearchUserActivity = $("#txtSearchUserActivity"); 
    let $txtSearchDate = $("#txtSearchDate"); 
    
    // Set the welcome header to the logged in user information
    $("#artName").text(`${currentLoggedIn.getLastName()}, ${currentLoggedIn.getFirstName()}`);
    $("#artID").text(`(ID: ${currentLoggedIn.getId()})`);

    $btnLogOutAdmin.click(function() {
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
            localStorage.setItem("currentLoggedIn", null); //Delete the currentLogged
            saveToLocalStorage();
        });

        // Function for the button no
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        // Append the children
        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);
    });

    $btnManageStudents.click(function() {
        hideAllSec();
        hideAllInputs();
        displayStudents();
        $secBot.show();
        $secSearchInputs.hide();
    });

    $btnManageLibrarian.click(function() {
        hideAllSec();
        hideAllInputs();
        displayLibrarians();
        $secBot.show();
        $secSearchInputs.hide();
    });

    $btnManageBookHistory.click(function() {
        hideAllSec();
        hideAllInputs();
        displayBooks();
        $secBot.show();
        $secSearchInputs.hide();
    });

    $btnManageActivityHistory.click(function() {
        hideAllSec();
        hideAllInputs();
        displayActivityHistory();
        $secBot.show();
        $secSearchInputs.hide();
    });

    $btnClearActivityHistory.click(function() {
        clearActivityHistory();
    });

    //Event listeners for buttons on Searching Students (show only relevant input)
    $("#btnSearchStudentId, #btnSearchStudentFirstName, #btnSearchStudentLastName, #btnSearchYearLevel, #btnSearchProgram, #btnSearchAcademicYear, #btnSearchStudentEmail").click(function() {
        hideAllInputs();
        displayStudents();
        $secSearchInputs.show();

        // Determine the corresponding input field per button
        let inputFieldList = {
            "btnSearchStudentId": $txtSearchStudentId,
            "btnSearchStudentFirstName": $txtSearchStudentFirstName,
            "btnSearchStudentLastName": $txtSearchStudentLastName,
            "btnSearchYearLevel": $txtSearchYearLevel,
            "btnSearchProgram": $selProgram,
            "btnSearchAcademicYear": $txtSearchAcademicYear,
            "btnSearchStudentEmail": $txtSearchStudentEmail

        };

        let inputField = inputFieldList[this.id];
        inputField.show().focus(); //show the input field then focus
    });

    // Search functions for each input (pass the search value as parameter)
    $txtSearchStudentId.on("input", () => filterStudents(0, $txtSearchStudentId.val()));
    $txtSearchStudentFirstName.on("input", () => filterStudents(1, $txtSearchStudentFirstName.val()));
    $txtSearchStudentLastName.on("input", () => filterStudents(2, $txtSearchStudentLastName.val()));
    $txtSearchYearLevel.on("input", () => filterStudents(3, $txtSearchYearLevel.val()));
    $selProgram.on("change", () => filterStudents(4, $selProgram.val()));
    $txtSearchAcademicYear.on("input", () => filterStudents(5, $txtSearchAcademicYear.val()));
    $txtSearchStudentEmail.on("input", () => filterStudents(6, $txtSearchStudentEmail.val()));


    //Event listeners for buttons on Searching Librarians (show only relevant input)
    $("#btnSearchLibrarianId, #btnSearchLibrarianFirstName, #btnSearchLibrarianLastName, #btnSearchLibrarianEmail").click(function() {
        hideAllInputs();
        displayLibrarians();
        $secSearchInputs.show();
        
        // Determine the corresponding input field per button
        let inputFieldList = {
            "btnSearchLibrarianId": $txtSearchLibrarianId,
            "btnSearchLibrarianFirstName": $txtSearchLibrarianFirstName,
            "btnSearchLibrarianLastName": $txtSearchLibrarianLastName,
            "btnSearchLibrarianEmail": $txtSearchLibrarianEmail
        };

        let inputField = inputFieldList[this.id];
        inputField.show().focus(); //show the input field then focus
    });

    // Search functions for each input (pass the search value as parameter)
    $txtSearchLibrarianId.on("input", () => filterLibrarian(0, $txtSearchLibrarianId.val()));
    $txtSearchLibrarianFirstName.on("input", () => filterLibrarian(1, $txtSearchLibrarianFirstName.val()));
    $txtSearchLibrarianLastName.on("input", () => filterLibrarian(2, $txtSearchLibrarianLastName.val()));
    $txtSearchLibrarianEmail.on("input", () => filterLibrarian(3, $txtSearchLibrarianEmail.val()));


    //Event listeners for buttons on Searching Books (show only relevant input)
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


    //Event listeners for buttons on Searching Activity (show only relevant input)
    $("#btnSearchUserId, #btnSearchUserEmail, #btnSearchUserActivity, #btnSearchDate").click(function() {
        hideAllInputs();
        displayActivityHistory();
        $secSearchInputs.show();
        
        // Determine the corresponding input field per button
        let inputFieldList = {
            "btnSearchUserId": $txtSearchUserId,
            "btnSearchUserEmail": $txtSearchUserEmail,
            "btnSearchUserActivity": $txtSearchUserActivity,
            "btnSearchDate": $txtSearchDate
        };

        let inputField = inputFieldList[this.id];
        inputField.show().focus(); //show the input field then focus
    });

    // Search functions for each input (pass the search value as parameter)
    $txtSearchUserId.on("input", () => filterActivities(0, $txtSearchUserId.val()));
    $txtSearchUserEmail.on("input", () => filterActivities(1, $txtSearchUserEmail.val()));
    $txtSearchUserActivity.on("input", () => filterActivities(2, $txtSearchUserActivity.val()));
    $txtSearchDate.on("input", () => filterActivities(3, $txtSearchDate.val()));

    //function to display students
    function displayStudents() {
        $secStudentHistory.show();
        
        $tblStudents.empty();

        Students.forEach((student, index) => {
            let $row = $("<tr></tr>");
            
            // List of fields to be displayed
            let fields = ["Id", "FirstName", "LastName",  "YearLevel", "Program", "AcademicYear", "Email"];
            let inputNumFields = ["YearLevel"];
            let selFields = ["Program"];
            let inputFields = ["FirstName", "LastName", "AcademicYear"]; // Editable 
            fields.forEach((field) => {
                let $dataCell = $("<td></td>");
                let $span = $(`<span id="${field.toLowerCase()}-student-${index}"></span>`).text(student[`get${field}`]());
    
                $dataCell.append($span);

                // Add input field for editable fields
                if (inputFields.includes(field)) {
                    let $input = $(`<input id="edit-${field.toLowerCase()}-student-${index}" type="text">`).val(student[`get${field}`]());
                    $input.hide();
                    $dataCell.append($input);
                } else if (inputNumFields.includes(field)) {
                    let $input = $(`<input id="edit-${field.toLowerCase()}-student-${index}" type="number">`).val(student[`get${field}`]());
                    $input.hide();
                    $dataCell.append($input);
                } else if (selFields.includes(field)) {
                    let programOptions = [
                        "BS Information Technology",
                        "BS History",
                        "BS Computer Science",
                        "BS Mathematics",
                        "BS Psychology",
                        "BS Engineering",
                        "BS Nursing",
                        "BS Biochemistry",
                        "BS Accountancy"
                    ];
                    let $select = $(`<select id="edit-${field.toLowerCase()}-student-${index}"></select>`);
                    programOptions.forEach((program) => {
                        let $option = $(`<option value="${program}">${program}</option>`);
                        if (program === student[`get${field}`]()) { $option.attr("selected", "selected"); }
                        $select.append($option);
                    });

                    $select.hide();
                    $dataCell.append($select);
                }
    
                $row.append($dataCell);
            });
    
            // Actions Column
            let $actionData = $("<td></td>");
            let $editBtn = $(`<button id="edit-student-${index}">Edit Student</button>`);
            $editBtn.show();
            
            let $saveBtn = $(`<button id="save-student-${index}" >Save Student</button>`);
            $saveBtn.hide();
            
            let $deleteBtn = $(`<button id="delete-student-${index}" >Delete Student</button>`);
            $deleteBtn.show(); // Event Handlers
            
            $editBtn.click(() => editStudent(index));
            $saveBtn.click(() => saveStudent(index));
            $deleteBtn.click(() => deleteStudent(index));
    
            // Append buttons
            $actionData.append($editBtn, $saveBtn, $deleteBtn);
            $row.append($actionData);
    
            $tblStudents    .append($row);
        });
        
    }

    //display and manage librarian accounts
    function displayLibrarians() {

        $secLibrarianHistory.show();

        $tblLibrarians.empty();

        Librarians.forEach((librarian, index) => {
            let $row = $("<tr></tr>");
    
            // List of fields to be displayed
            let fields = ["Id", "FirstName", "LastName", "Email"];
            let inputFields = ["FirstName", "LastName"]; // Editable fields
    
            fields.forEach((field) => {
                let $dataCell = $("<td></td>");
                let $span = $(`<span id="${field.toLowerCase()}-librarian-${index}"></span>`).text(librarian[`get${field}`]());
    
                $dataCell.append($span);

                // Add input field for editable fields
                if (inputFields.includes(field)) {
                    let $input = $(`<input id="edit-${field.toLowerCase()}-librarian-${index}" type="text">`).val(librarian[`get${field}`]());
                    $input.hide();
                    $dataCell.append($input);
                }
    
                $row.append($dataCell);
            });
    
            // Actions Column
            let $actionData = $("<td></td>");
            let $editBtn = $(`<button id="edit-librarian-${index}">Edit Librarian</button>`);
            $editBtn.show()
            
            let $saveBtn = $(`<button id="save-librarian-${index}" >Save Librarian</button>`);
            $saveBtn.hide();
            
            let $deleteBtn = $(`<button id="delete-librarian-${index}" >Delete Librarian</button>`);
            $deleteBtn.show();            // Event Handlers
            
            $editBtn.click(() => editLibrarian(index));
            $saveBtn.click(() => saveLibrarian(index));
            $deleteBtn.click(() => deleteLibrarian(index));
    
            // Append buttons
            $actionData.append($editBtn, $saveBtn, $deleteBtn);
            $row.append($actionData);
    
            $tblLibrarians.append($row);
        });
        
    }

    //display books history
    function displayBooks() {


        $secBooks.show();

        $tblBooks.empty();

        Books.forEach((book, index) => {
            let $row = $("<tr></tr>");
            
            let fields = ["Id", "Title", "Author", "Category", "Availability", "Borrower", "AddedBy"];
            
            // List of fields to be displayed
            fields.forEach((field) => {

                let displayText = book[`get${field}`](); 

                if (field === "Borrower") {
                    displayText = `Student Id: ${displayText}`;
                } else if (field === "AddedBy") {
                    displayText = `Librarian Id: ${displayText}`;
                }    
                let $dataCell = $("<td></td>");
                let $span = $(`<span id="${field.toLowerCase()}-book-${index}"></span>`).text(displayText);

                       

                $dataCell.append($span);
                $row.append($dataCell);
            });
            
            let $actionData = $("<td></td>");

            let $deleteBtn = $(`<button id="delete-book-${index}" >Delete Book </button>`);
            if (book.getAvailability() == "Borrowed") {
                $deleteBtn.hide();            
            } else {
                $deleteBtn.show();            
            }
            
            // Event Handlers
            $deleteBtn.click(() => deleteBook(index));
    
            // Append buttons
            $actionData.append($deleteBtn);
            $row.append($actionData);
    
            $tblBooks.append($row);
        });
    }

    function displayActivityHistory() {
        $secActivityHistory.show();

        $tblActions.empty();

        Activities.forEach((activity, index) => {
            let $row = $("<tr></tr>");
    
            // List of fields to be displayed
            let fields = ["UserId", "UserEmail", "UserActivity", "ActivityTime"];
    
            fields.forEach((field) => {
                let $dataCell = $("<td></td>");
                let $span = $(`<span id="${field.toLowerCase()}-activity-${index}"></span>`).text(activity[`get${field}`]());
    
                $dataCell.append($span);
                $row.append($dataCell);
            });

            // Actions Column
            let $actionData = $("<td></td>");
            
            let $deleteBtn = $(`<button id="delete-activity-${index}" >Delete Activity</button>`);
            $deleteBtn.show();           
            
            // Event Handlers
            $deleteBtn.click(() => deleteActivity(index));
    
            // Append buttons
            $actionData.append($deleteBtn);
            $row.append($actionData);
    
            $tblActions.append($row);
        });
    }

    //delete functions
    function deleteStudent(index) {

         // Confirmation popup for deleting book    
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});

        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Delete Student ID: ${Students[index].getId()} ? `);
 
        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {
             
            // The borrowed books will be automatically returned to the library if borrowed by the deleted student
            // Iterate through the student's borrowed books and remove its borrower then set it to available
            Students[index].getBorrowedBooks().forEach((borrowedBook) => {
                for (let bookIndex = 0; bookIndex < Books.length; bookIndex++) {
                    if (Books[bookIndex].getId() == borrowedBook._id) {
                        Books[bookIndex].setBorrower(null);
                        Books[bookIndex].setAvailability(true);
                    }
                }
            });
            
            // Delete the student inside the users list
            for (let userIndex = 0; userIndex < Users.length; userIndex++) {
                if (Students[index].getId() == Users[userIndex].getId()) {
                    Users.splice(userIndex, 1);
                    Students.splice(index, 1);
                    break;
                }
            }
            
            // Display confirmed message
            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Deleted Student!");

            // Close popup after pressing button okay
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);

            
            displayStudents();
            saveToLocalStorage();
            
        });
        
        // If user clicks no, just close popup
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);

    }

    function deleteLibrarian(index) {

        // Confirmation popup for deleting book    
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});

        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Delete Librarian ID: ${Librarians[index].getId()} ? `);
 
        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {

            // Delete the librarian also in the users list
            for (let userIndex = 0; userIndex < Users.length; userIndex++) {
                if (Librarians[index].getId() == Users[userIndex].getId()) {
                    Users.splice(userIndex, 1);
                    Librarians.splice(index, 1);
                    break;
                }
            }

            // Display confirmed message
            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Deleted Librarian!");

            // Close popup after pressing button okay
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);

            displayLibrarians();
            saveToLocalStorage();
        });
        
        // If user clicks no, just close popup
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);
    }

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

            Books.splice(index, 1);
            
            // Display confirmed message
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

    function deleteActivity(index) {

        // Confirmation popup for deleting book    
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});

        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Delete Activity ${++index} ? `);
 
        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {

            Activities.splice(index, 1);

            displayActivityHistory();
            saveToLocalStorage();

            // Display confirmed message
            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Deleted Activity!");

            // Close popup after pressing button okay
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);


        });
            
        // If user clicks no, just close popup
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);
    }

    // Edit Student Functions
    function editStudent(index) {
        singleEditStudent();

        let fields = ["firstname", "lastname", "yearlevel", "program", "academicyear"];
        
        fields.forEach((field) => {
            $(`#${field}-student-${index}`).hide();
            $(`#edit-${field}-student-${index}`).show();
        });

        $(`#edit-student-${index}`).hide();
        $(`#save-student-${index}`).show();
    }


    // Edit librarian function
    function editLibrarian(index) {
        singleEditLibrarian();

        let fields = ["firstname", "lastname"];
        
        fields.forEach((field) => {
            $(`#${field}-librarian-${index}`).hide();
            $(`#edit-${field}-librarian-${index}`).show();
        });

        $(`#edit-librarian-${index}`).hide();
        $(`#save-librarian-${index}`).show();
    }

    // Save student function
    function saveStudent(index) {
        
        try {
            let newFirstName = $(`#edit-firstname-student-${index}`).val();
            let newLastName = $(`#edit-lastname-student-${index}`).val();
            let newYearLevel = $(`#edit-yearlevel-student-${index}`).val();
            let newProgram = $(`#edit-program-student-${index}`).val();
            let newAcaYear = $(`#edit-academicyear-student-${index}`).val();
            let acaYearEntered = newAcaYear.split("-");
            
            if (!newFirstName || !newLastName || !newYearLevel || !newAcaYear) { throw new Validation("Please enter details correctly before saving"); }
            if (!acaYearFormat.test(newAcaYear)) { throw new Validation("Wrong Academic Year Format. (Correct: 2024-2025)"); }
            if (acaYearEntered[0] > acaYearEntered[1]) { throw new Validation("Beginning year should be one less than Ending Year."); }
            if (acaYearEntered[1] - acaYearEntered[0] > 1 || acaYearEntered[0] == acaYearEntered[1]) { throw new Validation("Academic Year is Only 1 Year"); } 
            if (newYearLevel < 1 || newYearLevel > 4) { throw new Validation("Only 1st-4th year college students are allowed"); }
 
            // Loop through the users list to also update the new data
            for (let userIndex = 0; userIndex < Users.length; userIndex++) {
                if (Students[index].getId() === Users[userIndex].getId()) {
                    Users[userIndex].setFirstName(newFirstName);
                    Users[userIndex].setLastName(newLastName);
        
                    Students[index].setFirstName(newFirstName);
                    Students[index].setLastName(newLastName);
                    Students[index].setYearLevel(newYearLevel);
                    Students[index].setProgram(newProgram);
                    Students[index].setAcademicYear(newAcaYear);
                    break;
                }
            }
        
            let fields = ["firstname", "lastname", "yearlevel", "program", "academicyear"];
            fields.forEach((field) => {
                $(`#${field}-student-${index}`).show();
                $(`#edit-${field}-student-${index}`).hide();
            });
            
            // Display the edit button after saving and hide the save button
            $(`#edit-student-${index}`).show();
            $(`#save-student-${index}`).hide();
        
            saveToLocalStorage();
            displayStudents(); // Display the list again
        } catch (err) {
            alert(err.message);
        }
        
    }
    
    // Save librarian function
    function saveLibrarian(index) {
        let newFirstName = $(`#edit-firstname-librarian-${index}`).val();
        let newLastName = $(`#edit-lastname-librarian-${index}`).val();
    
        for (let userIndex = 0; userIndex < Users.length; userIndex++) {
            if (Librarians[index].getId() === Users[userIndex].getId()) {
                Users[userIndex].setFirstName(newFirstName);
                Users[userIndex].setLastName(newLastName);
    
                Librarians[index].setFirstName(newFirstName);
                Librarians[index].setLastName(newLastName);
                break;
            }
        }
    
        let fields = ["firstName", "lastName", "email"];
        fields.forEach((field) => {
            $(`#${field}-librarian-${index}`).show();
            $(`#edit-${field}-librarian-${index}`).hide();
        });
    
        $(`#edit-librarian-${index}`).show();
        $(`#save-librarian-${index}`).hide();
    
        saveToLocalStorage();
        displayLibrarians();
    }
    

    // Function to Make sure to only edit one student
    function singleEditStudent(activeSaveIndex) {
        let fields = ["firstname", "lastname", "yearlevel", "program", "academicyear"];
        
        Students.forEach((student, index) => {
            let btnSave = $(`#save-student-${index}`);
            if (btnSave.is(":visible") && index !== activeSaveIndex) { 
                fields.forEach((field) => {
                    $(`#${field}-student-${index}`).show();
                    $(`#edit-${field}-student-${index}`).hide();
                });
    
                $(`#edit-student-${index}`).show();
                btnSave.hide();
            }
        }); 
    }
    

    // Function to Make sure to only edit one librarian
    function singleEditLibrarian(activeSaveIndex) {
        let fields = ["firstName", "lastName", "email"];
        
        Librarians.forEach((librarian, index) => {
            let btnSave = $(`#save-librarian-${index}`);
            if (btnSave.is(":visible") && index !== activeSaveIndex) { 
                fields.forEach((field) => {
                    $(`#${field}-librarian-${index}`).show();
                    $(`#edit-${field}-librarian-${index}`).hide();
                });
    
                $(`#edit-librarian-${index}`).show();
                btnSave.hide();
            }
        }); 
    }
    

    // Search function for displaying books
    function filterStudents(columnIndex, searchValue) {
        let $rows = $tblStudents.find("tr"); //find the table rows 

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
    function filterLibrarian(columnIndex, searchValue) {
        let $rows = $tblLibrarians.find("tr");

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
    function filterActivities(columnIndex, searchValue) {
        let $rows = $tblActions.find("tr");

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

    function clearActivityHistory() {
        // Confirmation popup for deleting book    
        $("#popupContainer").empty(); // Clear all other popups first
        $("#popupContainer").css({"display": "flex", "position": "fixed"});

        let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

        // Clive mascot
        let $clive = $("<img>");
        $clive.attr("src", "/Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");
        
        let $popupContent = $("<div>").attr("id", "popup-content");
        let $popupMessage = $("<p>").text(`Are you sure to Clear History?`);
 
        let $btnYes = $("<a>").addClass("button-style").text("Yes").on("click", function() {

            Activities.length = 0;
            
            $("#popupContainer").empty();
            $("#popupContainer").css({"display": "flex", "position": "fixed"});

            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");
            let $popupContent = $("<div>").attr("id", "popup-content");
            let $popupMessage = $("<p>").text("Successfully Cleared Activity History!");

            // Close popup after pressing button okay
            let $btnOkay = $("<a>").addClass("button-style").text("Okay").on("click", closePopup);
            
            $popupContent.append($clive, $popupMessage, $btnOkay);
            $popupOuterContainer.append($popupContent)
            $("#popupContainer").append($popupOuterContainer);

            displayActivityHistory();
            saveToLocalStorage();
        });
        
        // If user clicks no, just close popup
        let $btnNo = $("<a>").addClass("button-style").text("No").on("click", closePopup);

        $popupContent.append($clive, $popupMessage, $btnYes, $btnNo);
        $popupOuterContainer.append($popupContent);
        $("#popupContainer").append($popupOuterContainer);
    }
    function hideAllSec() {
        $secStudentHistory.hide();
        $secLibrarianHistory.hide();
        $secBooks.hide();
        $secActivityHistory.hide();
    }

    //function hiding all inputs
    function hideAllInputs() {

        /// Group all elements in an array
        let inputs = [
            $txtSearchStudentId, $txtSearchStudentFirstName, $txtSearchStudentLastName, 
            $txtSearchYearLevel, $txtSearchAcademicYear, $txtSearchStudentEmail, 
            $txtSearchLibrarianId, $txtSearchLibrarianFirstName, $txtSearchLibrarianLastName, 
            $txtSearchLibrarianEmail, $txtSearchBookId, $txtSearchBookTitle, 
            $txtSearchBookAuthor, $txtSearchBookCategory, $txtSearchUserId, 
            $txtSearchUserEmail, $txtSearchUserActivity, $txtSearchDate
        ];
        
        let dropdowns = [$selBookAvailability, $selProgram]; // List of dropdowns

        // Hide and clear inputs
        inputs.forEach(input => input.hide().val(""));

        // Hide dropdowns and reset values
        dropdowns[0].hide().val("Available");
        dropdowns[1].hide().val("BS Information Technology");


    }

    function saveToLocalStorage() {
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
        
        Books = JSON.parse(localStorage.getItem("Books"));
        Users = JSON.parse(localStorage.getItem("Users"));
        Students = JSON.parse(localStorage.getItem("Students"));
        Librarians = JSON.parse(localStorage.getItem("Librarians"));
        Admins = JSON.parse(localStorage.getItem("Admins"));
        Activities = JSON.parse(localStorage.getItem("Activities"));
        currentLoggedIn = JSON.parse(localStorage.getItem("currentLoggedIn"));

        if (!Books) { Books = []; }
        if (!Users) { Users = []; }
        if (!Students) { Students = []; }
        if (!Librarians) { Librarians = []; }
        if (!Admins) { Admins = []; }
        if (!Activities) { Activities = []; }
        currentLoggedIn = Object.assign(new Admin(), currentLoggedIn);

        
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

        Students.forEach((student, index) => {
            let studentInstance = new Student();
            Object.assign(studentInstance, student);
            Students[index] = studentInstance;
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
