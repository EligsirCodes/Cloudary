	class User {

		_id;
		_firstName;
		_lastName;
		_email;
		_password;
		_category

		constructor (id, firstName, lastName, email, password, category) {
			this._id = id;
			this._firstName = firstName;
			this._lastName = lastName;
			this._email = email;
			this._password = password;
			this._category = category;
		}

		getId() { return this._id; }
		getFirstName() { return this._firstName; }
		getLastName() { return this._lastName; }
		getEmail() { return this._email; }
		getPassword() { return this._password; }
		getCategory() { return this._category; }
		getFullName() { return `${this._lastName}, ${this._firstName}`; }

		setId(id) { this._id = id; }
		setFirstName(firstName) { this._firstName = firstName; }
		setLastName(lastName) { this._lastName = lastName; }
		setEmail(email) { this._email = email; }
		setPassword(password) { this._password = password; }
		setCategory(category) { this._category = category; }

	}

	class Student extends User {
		_yearLevel;
		_program;
		_borrowedBooks = [];
		_academicYear;

		constructor(id, firstName, lastName, email, password, yearLevel, program, academicYear) {
			super(id, firstName, lastName, email, password);
			this._yearLevel = yearLevel;
			this._program = program;
			this._academicYear = academicYear;
		}

		addBorrowedBook(book) {
			this._borrowedBooks.push(book);
		}

		removeBorrowedBook(index) {
			this._borrowedBooks.splice(index, 1);
		}


		getYearLevel() { return this._yearLevel; }
		getProgram() { return this._program; }
		getAcademicYear() { return this._academicYear; }
		getBorrowedBooks() { return this._borrowedBooks; }

		setYearLevel(yearLevel) { this._yearLevel = yearLevel; }
		setProgram(program) { this._program = program; }
		setAcademicYear(academicYear) { this._academicYear = academicYear; }
		

	}

	class Librarian extends User {
		_borAndRetBooksList = [];

		constructor(id, firstName, lastName, email, password) {
			super(id, firstName, lastName, email, password);
		}

		addBorrowedBook(book, borrowerId, borrowerName, activity) {
			this._borAndRetBooksList.push({book, borrowerId, borrowerName, activity});
		}

		addReturnedBook(book, returnerId, returnerName, activity) {
			this._borAndRetBooksList.push({book, returnerId, returnerName, activity});
		}

		getBorrowedAndReturnedBooks() {
			return this._borAndRetBooksList;
		}

		setBorrowedAndReturnedBooks() {
			this._borAndRetBooksList = [];
		}
	}

	class Admin extends User {

		constructor(id, firstName, lastName, email, password) {
			super(id, firstName, lastName, email, password);
		}

	}

	