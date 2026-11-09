$(function() { //document ready function for jquery
    
    let regex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/; //Email format
    let acaYearFormat = /^\d{4}-\d{4}$/; //Academic Year Format
    let nameRegex = /^[A-Za-z\s'-]+$/; //name format

    // Default values
    let userId = 1001;
    let errorCount = 0;

    // Get the system time zone using built in Date() method
    let now = new Date();
    let time = now.toLocaleString();

    // Text fields in log in 
    let $txtEmailLog = $("#txtEmailLog");
    let $txtPasswordLog = $("#txtPasswordLog");

    // Text fields in register
    let $txtFirstName = $("#txtFirstName");
    let $txtLastName = $("#txtLastName");
    let $txtEmail = $("#txtEmail");
    let $txtPasswordReg = $("#txtPasswordReg");
    let $txtConfirmPassword = $("#txtConfirmPassword");

    // Text fields in register student
    let $txtYearLevel = $("#txtYearLevel");
    let $selProgram = $("#selProgram");
    let $txtAcaYear = $("#txtAcaYear");

    // Log in and register forms
    let $secRegisterPage = $("#secRegisterPage");
    let $secLogIn = $("#secLogIn");
    let $secLogInAs = $("#secLogInAs");

    // Error texts for displaying errors
    let $errorFirstName = $("#errorFirstName");
    let $errorLastName = $("#errorLastName");
    let $errorEmailAddress = $("#errorEmailAddress");
    let $errorPass = $("#errorPass");
    let $errorConfirmPass = $("#errorConfirmPass");
    let $accError = $("#accError");

    // Register form for student, librarian, and admin
    let $registerStudent = $("#registerStudent");
    let $registerLibrarian = $("#registerLibrarian");
    let $registerAdmin = $("#registerAdmin");

    let currentLoggedIn = null; //currently logged in with null value

    // Array for the classes/objects
    let Books = [];
    let Users = [];
    let Students = [];
    let Librarians = [];
    let Admins = [];
    let Activities = [];

    // Span texts for the user to see who's logging/registering in
    let spanTextLogIn = ["Student", "Librarian", "Admin"];
    let spanTextRegister = ["Student", "Librarian", "Admin"];

    // Container of span texts
    let $txtLogInAs = $("#txtLogInAs");
    let $txtRegisterAs = $("#txtRegisterAs");

    // Pop up container
    let $popupContainer = $("#popupContainer");

    let emailDuplicate = false; //duplicate email

    // Check what type of user
    let asStudent = false;
    let asLibrarian = false;
    let asAdmin = false;

    // Access from local storage before operating
    accessFromLocalStorage();

    // Event listener for going back to login
    $("#btnBackToLoginMenu").click(function() { logInMenu(); clearAllFields(); });

    // Event listener for showing and hiding password in log in interface
    $("#btnLogShowPass").on("click", function() {
        setTimeout(() => {
            let type = $txtPasswordLog.attr("type") === "password" ? "text" : "password";
            $txtPasswordLog.attr("type", type);
        }, 300); // Delay matches the animation timing
    });

    // Buttons for showing password and confirm password while registering
    $("#btnRegShowPass").click(function() { //Show password field
        setTimeout(() => {
            let type = $txtPasswordReg.attr("type") === "password" ? "text" : "password";
            $txtPasswordReg.attr("type", type);
        }, 300); // Delay matches the animation timing
    });

    $("#btnRegConfShowPass").click(function() { // Show confirm password field
        setTimeout(() => {
            let type = $txtConfirmPassword.attr("type") === "password" ? "text" : "password";
            $txtConfirmPassword.attr("type", type);
        }, 300); // Delay matches the animation timing

    });

    // Text fields listener to show error while typing
    $txtFirstName.on("input", function() { //first name field
        if (!$txtFirstName.val()) {
            $errorFirstName.text("Please enter first name!");
            if (errorCount < 1) { errorCount++; } //Increase error count
        } else if (!nameRegex.test($txtFirstName.val())) { // Test if contains any unnecessary characters
            $errorFirstName.text("First Name should not contain numbers or any special characters.");
            if (errorCount < 1) { errorCount++; }
        } else { // No Error detected
            $errorFirstName.text("");
            if (errorCount > 0) { errorCount--; } //Decrease error count
        }
    });
    $txtLastName.on("input", function() { // Last name field
        if (!$txtLastName.val()) {
            $errorLastName.text("Please enter last name!");
            if (errorCount < 1) { errorCount++; }
        } else if (!nameRegex.test($txtLastName.val())) {
            $errorFirstName.text("Last Name should not contain numbers or any special characters.");
            if (errorCount < 1) { errorCount++; }
        } else {
            $errorLastName.text("");
            if (errorCount > 0) { errorCount--; }
        }
    });
    $txtEmail.on("input", function() { //Email field
        
        for (let index = 0; index < Users.length; index++) { //Find for duplicate emails
            if (Users[index].getEmail() === $txtEmail.val()) {
                emailDuplicate = true; //There's a duplicate email
                break; //Stop iterating through the array
            } else {
                emailDuplicate = false;
            }
        }
        
        // Check for valid email
        if (!$txtEmail.val()) { // Check if contains space/empty
            $errorEmailAddress.text("Please enter email!");
            if (errorCount < 1) { errorCount++; }

        } else if (!regex.test($txtEmail.val()) || $txtAcaYear.val().indexOf(" ") !== -1) { // Test email format without spaces
            $errorEmailAddress.text("Incorrect Email Format! (No Spaces are allowed)");
            if (errorCount < 1) { errorCount++; }

        } else if (emailDuplicate) { // Check if email is already taken
            $errorEmailAddress.text("Email is already taken!");
            if (errorCount < 1) { errorCount++; }

        } else {
            $errorEmailAddress.text("");
            if (errorCount > 0) { errorCount--; }
        }
    });
    $txtPasswordReg.on("input", function() { // Password field

        if (!$txtPasswordReg.val() || $txtAcaYear.val().indexOf(" ") !== -1) {
            $errorPass.text("Please enter password! (No Spaces are allowed)");
            if (errorCount < 1) { errorCount++; }

        } else if ($txtPasswordReg.val().length < 8) {
            $errorPass.text("Your Password should be atleast 8 characters!");
            if (errorCount < 1) { errorCount++; }

        } else {
            $errorConfirmPass.text("");
            $errorPass.text("");
            if (errorCount > 0) { errorCount--; }

        }

        // Check if password and confirm password are equal
        if ($txtPasswordReg.val().length >= 8 && 
            $txtConfirmPassword.val() != $txtPasswordReg.val() && 
            $txtConfirmPassword.val() != "") { // Error handling at first test of password

                $errorConfirmPass.text("Password and Confirm Password does not match!");
                if (errorCount < 1) { errorCount++; }

        } 
        
    
    });
    $txtConfirmPassword.on("input", function() { // Confirm Password field
        if (!$txtConfirmPassword.val()) { 
            $errorConfirmPass.text("Please confirm password! (No Spaces are allowed)");
            if (errorCount < 1) { errorCount++; }

        } else if ($txtConfirmPassword.val() != $txtPasswordReg.val()) {
            $errorConfirmPass.text("Password and Confirm Password does not match!");
            if (errorCount < 1) { errorCount++; }

        } else {
            $errorConfirmPass.text("");
            if (errorCount > 0) { errorCount--; }

        }
    });
    $txtYearLevel.on("input", function() { //Year level field (for students)
        if (!$txtYearLevel.val()) {
            $("#errorYearLevel").text("Please enter your Year Level! (No Spaces are allowed)");
            if (errorCount < 1) { errorCount++; }
        } else if ($txtYearLevel.val() < 1 || $txtYearLevel.val() > 4) {
            $("#errorYearLevel").text("Only 1st-4th Year are allowed.");
            if (errorCount < 1) { errorCount++; }
        } else {
            $("#errorYearLevel").text("");
            if (errorCount > 0) { errorCount--; }
        }
    });
    $txtAcaYear.on("input", function() { //Academic Year field (for students)
        let years = $txtAcaYear.val().split("-");
        if (!$txtAcaYear.val() || $txtAcaYear.val().indexOf(" ") !== -1) {
            $("#errorAcademicYear").text("Please enter your Academic Year! (No Spaces are allowed)");
            if (errorCount < 1) { errorCount++; }
        } else if (!acaYearFormat.test($txtAcaYear.val())) {
            $("#errorAcademicYear").text("Wrong Academic Year Format! (should be YYYY-YYYY)");
            if (errorCount < 1) { errorCount++; }
        } else if (parseInt(years[0]) > parseInt(years[1])) {
            $("#errorAcademicYear").text("Starting Year must be one less than the Ending Year.");
            if (errorCount < 1) { errorCount++; }
        } else if (parseInt(years[1]) - parseInt(years[0]) >= 2 || parseInt(years[0]) == parseInt(years[1])) {
            $("#errorAcademicYear").text("Academic Year needs to be One Year Only!");
            if (errorCount < 1) { errorCount++; }
        }  else {
            $("#errorAcademicYear").text("");
            if (errorCount > 0) { errorCount--; }
        }
    });

    //the hyper links that will go to desired log in 
    $("#logInStudent").click(function() { //log in as student
        logInForm();
        asStudent = true;
        asLibrarian = false;
        asAdmin = false;
        $txtLogInAs.text(spanTextLogIn[0]);
    });

    $("#logInLibrarian").click(function() {  //log in as librarian
        logInForm(); 
        asLibrarian = true;
        asStudent = false;
        asAdmin = false;
        $txtLogInAs.text(spanTextLogIn[1]);
    });

    $("#logInAdmin").click(function() {  //log in as admin
        logInForm(); 
        asAdmin = true;
        asStudent = false;
        asLibrarian = false;
        $txtLogInAs.text(spanTextLogIn[2]);
    });

    //back to log in
    $("#btnBackToLoginStudent").click(function() { //back to log in as student
        logInForm();
        asStudent = true;
        asLibrarian = false;
        asAdmin = false;
        $txtLogInAs.text(spanTextLogIn[0]);
        clearAllFields();
        hideAllRegForm();
    });

    $("#btnBackToLoginLibrarian").click(function() { //back to log in as librarian
        logInForm(); 
        asLibrarian = true;
        asStudent = false;
        asAdmin = false;
        $txtLogInAs.text(spanTextLogIn[1]);
        clearAllFields();
        hideAllRegForm();
    });

    $("#btnBackToLoginAdmin").click(function() { //back to log in as admin
        logInForm(); 
        asAdmin = true;
        asStudent = false;
        asLibrarian = false;
        $txtLogInAs.text(spanTextLogIn[2]);
        clearAllFields();
        hideAllRegForm();
    });

    //button register an account event listener
    $("#btnRegisterAccount").click(function() { 
        registerForm(); //call and show register form
        
        if (asStudent) { //register as student
            $txtRegisterAs.text(spanTextRegister[0]);
            $registerStudent.show();
            $registerLibrarian.hide();
            $registerAdmin.hide();
            $("#btnBackToLoginStudent").show();
        }

        else if (asLibrarian) { //register as librarian
            $txtRegisterAs.text(spanTextRegister[1]);
            $registerStudent.hide();
            $registerLibrarian.show();
            $registerAdmin.hide();
            $("#btnBackToLoginLibrarian").show();
        }

        else if (asAdmin) { //register as admin
            $txtRegisterAs.text(spanTextRegister[2]);
            $registerStudent.hide();
            $registerLibrarian.hide();
            $registerAdmin.show();
            $("#btnBackToLoginAdmin").show();
        }
    });

    $("#btnLogIn").click(function() { logInUser(); });  //log in button


    //register account button
    $("#btnRegisterStudent").click(function(){ registerUser(); });
    $("#btnRegisterLibrarian").click(function(){ registerUser(); });
    $("#btnRegisterAdmin").click(function(){ registerUser(); });

    //back to log in menu
    function logInMenu() {
        $secLogInAs.show();
        $secLogIn.hide();
        $secRegisterPage.hide();
    }

    //function for log in form
    function logInForm() {
        $secLogInAs.hide();
        $secLogIn.show();
        $secRegisterPage.hide();
    }

    //function for showing register form
    function registerForm() {
        $secLogInAs.hide();
        $secLogIn.hide();
        $secRegisterPage.show();
    }

    //function for registering user
    function registerUser() {
        try {

            //error handler
            if (!$txtFirstName.val() && !$txtLastName.val() && !$txtEmail.val() && !$txtPasswordReg.val()) {
                throw new Validation("Please enter above informations first.");
            }
            if (!$txtFirstName.val()) { throw new Validation("Please enter your First Name."); }
            if (!$txtLastName.val()) { throw new Validation("Please enter your Last Name."); }
            if (!$txtEmail.val()) { throw new Validation("Please enter your Email Address."); }
            if (!regex.test($txtEmail.val())) { throw new Validation("Incorrect format of email address."); }
            if (emailDuplicate) { throw new Validation("Email Address is already taken."); }
            if (!$txtPasswordReg.val()) { throw new Validation("Please enter your Password for security."); }
            if (errorCount > 0) { throw new Validation("Please complete all the required fields before submitting."); }

            
            //Check for duplicate id (increase if it duplicates)
            for (let max = 0; max < Users.length; max++) {
                while (Users[max].getId() == userId) {
                    userId++; //increase id if found duplicate
                } 
            }

            //Check what type of user
            if (asStudent) { //register as student

                if (!$txtYearLevel.val()) { throw new Validation("Please enter your Year Level."); }
                if (!$txtAcaYear.val()) { throw new Validation("Please enter your Academic Year."); }

                Students.push(new Student(userId, 
                    $txtFirstName.val(), 
                    $txtLastName.val(),
                    $txtEmail.val(),
                    $txtPasswordReg.val(),
                    $txtYearLevel.val(),
                    $selProgram.val(),
                    $txtAcaYear.val())); 
            }

            else if (asLibrarian) { //register as student
                Librarians.push(new Librarian(userId, 
                    $txtFirstName.val(), 
                    $txtLastName.val(),
                    $txtEmail.val(),
                    $txtPasswordReg.val()));
            }

            else if (asAdmin) { //register as student
                Admins.push(new Admin(userId, 
                    $txtFirstName.val(), 
                    $txtLastName.val(),
                    $txtEmail.val(),
                    $txtPasswordReg.val()));
            }
            
            Users.push(new User(userId, //add new user
                $txtFirstName.val(), 
                $txtLastName.val(),
                $txtEmail.val(),
                $txtPasswordReg.val()));
            

            saveToLocalStorage();

            //Pop up notification
            $popupContainer.empty();
            $popupContainer.css({ "display": "flex", "position": "fixed" });
            
            //outer container
            let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

            //clive mascot
            let $clive = $("<img>").attr("id", "popupRegClive");

            $clive.attr("src", "../Starting Page/CSS/Assets/Clive.png");

            // Create popup content
            let $popupContent = $("<div>").attr("id", "popup-content" );

            // Separate the user ID from other details
            $popupContent.append($clive);
            $popupContent.append("<br><br>Successfully Registered!", "<br><br>");            
            $popupContent.append(`Id : ${userId}`, "<br>");            
            $popupContent.append(`Name : ${$txtFirstName.val()} ${$txtLastName.val()}`, "<br>");
            $popupContent.append(`Email Address : ${$txtEmail.val()}`, "<br><br>");

            // Create the back-to-login button
            let $btnBackToLogInPopUp = $("<button>").addClass("button-style").text("Back To Log In Menu").on("click", function() {
                closePopup();
                logInMenu();
            });

            clearAllFields(); //Clear all text fields after registering

            // Append elements separately
            $popupContent.append($btnBackToLogInPopUp);
            $popupOuterContainer.append($popupContent);
            $("#popupContainer").append($popupOuterContainer);



        } catch (err) { //Catch and display error if found
            if (err instanceof Validation) {
                alert(err.message);
            } else {
                alert(err.name);
                alert(err.message);
                alert(err.stack);

            }
        }
        
    }

    //function for logging in a user
    function logInUser() {

        //boolean for checking if student, librarian, or admin is logging in
        let isStudent = false;
        let isLibrarian = false;
        let isAdmin = false;
        
        //boolean for found acc
        let accountFound = false;
        
        try {

            //Validation check if they try to log in without inputs
            if (!$txtEmailLog.val() && !$txtPasswordLog.val()) { throw new Validation("Please Enter Email & Passoword.")}
            if (!$txtEmailLog.val()) { throw new Validation("Please Enter Email."); }
            if (!$txtPasswordLog.val()) { throw new Validation("Please Enter Password."); }

            //Check the span text to see if they're student,librarian, or admin
            if ($txtLogInAs.text() === spanTextLogIn[0]) { //Student logging in 
                Students.forEach((student) => { //Check if email and password aligned
                    if ($txtEmailLog.val() === student.getEmail() && $txtPasswordLog.val() === student.getPassword()) {
                        isStudent = true;
                        accountFound = true;
                        currentLoggedIn = student;
                    }
                });

            } else if ($txtLogInAs.text() === spanTextLogIn[1]) { //Librarian logging in
                Librarians.forEach((librarian) => { 
                    if ($txtEmailLog.val() === librarian.getEmail() && $txtPasswordLog.val() === librarian.getPassword()) {
                        isLibrarian = true;
                        accountFound = true;
                        currentLoggedIn = librarian;
                    }
                });

            } else if ($txtLogInAs.text() === spanTextLogIn[2]) { //Admin logging in
                Admins.forEach((admin) => {
                    if ($txtEmailLog.val() === admin.getEmail() && $txtPasswordLog.val() === admin.getPassword()) {
                        isAdmin = true;
                        accountFound = true;
                        currentLoggedIn = admin;
                    }
                });
            }
            
            // if account isn't found, display an error

            if (isStudent || isLibrarian) {
                Activities.push(new Activity(currentLoggedIn.getId(), currentLoggedIn.getEmail(), "Logged In.", time));
            }

            if (!accountFound) {
                $accError.text("Incorrect Email or Password.");

            } else {

                //display pop up if account is found
                $popupContainer.empty();
                
                //Pop up notify for successful Log In
                $popupContainer.css({"display": "flex", "position": "fixed"});

                let $popupOuterContainer = $("<div>").attr("id", "popup-outer-container");

                let $clive = $("<img>");
                $clive.attr("src", "../Starting Page/CSS/Assets/Clive.png").attr("id", "popupClive");

                let $popupContent = $("<div>").attr("id", "popup-content");
                let $popupMessage = $("<p>").text("Successfully Logged In!");
                let $btnOkay = $("<button>").addClass("button-style").text("Okay").on("click", closePopup);
                let $nextPage = $("<a>").append($btnOkay);

                if (isStudent) { $nextPage.attr("href", "/Starting Page/Student/student.html"); }
                else if (isLibrarian) { $nextPage.attr("href", "/Starting Page/Librarian/librarian.html"); }
                else if (isAdmin) { $nextPage.attr("href", "/Starting Page/Admin/admin.html"); }
                
                $popupContent.append($clive, $popupMessage, $nextPage);
                $popupOuterContainer.append($popupContent)
                $popupContainer.append($popupOuterContainer);

                clearAllFields();
                
                saveToLocalStorage(); //Save to local storage after changes

            }
           
        } catch (err) {
            if (err instanceof Validation) {
                alert(err.message);
            }
        }
        
    }

    //function for clearing all fields
    function clearAllFields() {

        //clear all log In fields, 
        //register fields,
        //error texts
        $("#txtEmailLog, #txtFirstName, #txtLastName, #txtEmail, #txtYearLevel, #txtAcaYear").val("");
        $("#errorFirstName, #errorLastName, #errorEmailAddress, #errorPass, #errorConfirmPass, #accError").text("");
        
        //set all related password inputs to their default type and value
        $("#txtPasswordLog, #txtPasswordReg, #txtConfirmPassword").val("").attr("type", "password");
        
        //reset the eye buttons
        $("#imgShowHide, #imgShowHidePass, #imgShowHideCon").attr("src",  "./CSS/Assets/Show.png");
        $("#btnRegShowPass, #btnRegConfShowPass").css("background-color", "rgb(135, 182, 255)");

        //set select program to its default value
        $("#selProgram").val("BS Information Technology");
        
    }

    //Hiding all register form
    function hideAllRegForm() {
        $registerStudent.hide();
        $registerLibrarian.hide();
        $registerAdmin.hide();
    }

    //Save necessary data to local storage
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
        if (currentLoggedIn != null) {
            if (asStudent) {
                currentLoggedIn = Object.assign(new Student(), currentLoggedIn);
            } else if (asLibrarian) {
                currentLoggedIn = Object.assign(new Librarian(), currentLoggedIn);
            } else if (asAdmin) {
                currentLoggedIn = Object.assign(new Admin(), currentLoggedIn);
            } 
        } else {
            currentLoggedIn = {};
        }
        
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

    // Enter Key to automatically log in when pressing enter
    $("#secLogIn").on("keydown", function(event) {
        // Check if the Enter key (key code 13) is pressed
        if (event.key === "Enter") {
            event.preventDefault();  // Prevents form submission
            $("#btnLogIn").click();  // Trigger the login button click

        }
    });

    //display pop up
    function showPopup() {
        $("#popupContainer").show();
    }

    //close pop up
    function closePopup() {
        $("#popupContainer").hide();
    }
});

