# Cloudary

> *Endless books, floating in the Cloud.*

**Cloudary** is a browser-based library management system with a cloud-themed interface. It supports three kinds of users (students, librarians and admins), each with their own registration, login and dashboard. Students browse and borrow books, librarians manage the catalog and track borrowing, and admins oversee all users and records.

The app runs entirely in the browser. It has no server or database, and all data is saved in the browser's `localStorage`.

## Features

### Students
- Register with name, email, password, year level, program and academic year
- Browse the full book catalog in **Explore Our Cloudary**
- Search books by ID, title, author, category or availability
- Borrow available books and return borrowed books
- View a personal list of currently borrowed books, with search

### Librarians
- Add new books to the catalog (title, author, category)
- Edit and delete existing books inline
- Search the catalog by ID, title, author, category or availability
- View the **book history** of every borrow and return, including the student's ID and name
- Search the history by book ID, student ID or activity (Borrowed / Returned)
- Delete individual history entries or clear the entire history

### Admins
- **Manage Students:** view, search, edit and delete student accounts
- **Manage Librarians:** view, search, edit and delete librarian accounts
- **Manage Book History:** monitor and delete borrowing records
- **Manage Activity History:** review a log of user activity (user ID, email, action, timestamp) with search and clearing

### Registration and login
- Role selection screen ("Log In As Student / Librarian / Admin")
- Real-time form validation with inline error messages:
  - Names accept letters, spaces, apostrophes and hyphens only
  - Email format check and duplicate-email detection
  - Password and confirm-password matching
  - Year level limited to 1st through 4th year
  - Academic year must follow the `YYYY-YYYY` format and span exactly one year
- Show/hide password toggle on all password fields
- Pressing **Enter** submits the login form
- Pop-up dialogs for success and error messages

## Tech Stack

| Area | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom layouts, animated cloud decorations) |
| Scripting | JavaScript (ES6 classes), jQuery 3.7.1 |
| Storage | Browser `localStorage` |
| Fonts | Google Fonts: Cherry Bomb One, Figtree, Pacifico, Pixelify Sans, Playfair Display |

## Project Structure

```
Cloudary - Finalized Code/
└── Library/
    └── Starting Page/
        ├── index.html              # Role selection, login and registration
        ├── CSS/                    # Styles for the landing, login and register screens
        │   └── Assets/             # Logo, icons and decorative images
        ├── JS/
        │   ├── script.js           # Registration, login, validation, storage
        │   └── *Animation.js       # Screen transition animations
        ├── JS Assets/
        │   ├── User.js             # User, Student, Librarian and Admin classes
        │   ├── Book.js             # Book class
        │   ├── Activity.js         # Activity log class
        │   ├── Validation.js       # Custom validation error class
        │   └── jquery-3.7.1.min.js
        ├── Student/                # Student dashboard (HTML, CSS, JS)
        ├── Librarian/              # Librarian dashboard (HTML, CSS, JS)
        └── Admin/                  # Admin dashboard (HTML, CSS, JS)
```

## Object Model

The app uses an object-oriented design in plain JavaScript:

- `User` is the base class (id, name, email, password, category).
  - `Student` extends `User` and adds year level, program, academic year and a list of borrowed books.
  - `Librarian` extends `User` and keeps a list of borrow and return records.
  - `Admin` extends `User`.
- `Book` holds the id, title, author, category, availability, who added it, and the current borrower.
- `Activity` records the user ID, email, action and timestamp.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/EligsirCodes/Cloudary.git
   ```
2. **Open the app**
   - Open `Cloudary - Finalized Code/Library/Starting Page/index.html` in any modern browser.
   - Or serve the folder with a tool such as the VS Code **Live Server** extension.
3. **Create accounts**
   - There are no preloaded accounts, so register at least one librarian first.
   - Register a student and an admin to try all three dashboards.
4. **Try the workflow**
   - Log in as a librarian and add a few books.
   - Log in as a student to borrow and return them.
   - Log in as the librarian or admin to see the history and activity log.

## Limitations

- **Per-browser data:** Everything is stored in `localStorage`, so data is local to one browser and is lost if the browser data is cleared.
- **No server-side security:** Passwords are stored as entered, so the app is meant for learning and demonstration, not for production use.
- **No book seed data:** The catalog starts empty.
