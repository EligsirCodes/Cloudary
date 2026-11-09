class Book {
	_id;
	_title;
	_author;
	_category;
	_availability;
	_addedBy;
	_borrower;

	constructor(id, title, author, category, availability) {
		this._id = id;
		this._title = title;
		this._author = author;
		this._category = category;
		this._availability = availability;
		this._addedBy = null;
		this._borrower = null;
	}

	getId() { return this._id; }
	getTitle() { return this._title; }
	getAuthor() { return this._author; }
	getCategory() { return this._category; }
	getAvailability() { 
		if(!this._availability){
			return `Borrowed`;
		}else{
			return `Available`;
		};
	}
	getAddedBy() { return this._addedBy; }
	getBorrower() { 
		if (this._borrower) {
			return this._borrower; 
		} else {
			return "";
		}
	}

	setId(id) { this._id = id; }
	setTitle(title) { this._title = title; }
	setAuthor(author) { this._author = author; }
	setCategory(category) { this._category = category; }
	setAvailability(availability) { this._availability = availability; }
	setAddedBy(id) { this._addedBy = id; }
	setBorrower(borrower) { this._borrower = borrower; }


}