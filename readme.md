# Library Management System
This is a Library Management System built using React, TypeScript, SCSS, Redux, Redux Toolkit, Java, Spring Boot, and authentication and security features. The system allows users to search for books, sort them by genres such as novel, science, adventure, fiction, etc. The admin has additional functionalities like updating books, deleting books, adding books, and viewing transaction history of borrowed books. The system also includes a borrowing feature with a return deadline of 3 weeks, as well as a like feature for books.

* Technologies Used

- Front-end:
React: A JavaScript library for building user interfaces.
TypeScript: A strongly typed superset of JavaScript that compiles to plain JavaScript.
SCSS: A CSS preprocessor that adds power and elegance to the basic CSS syntax.
Redux: A predictable state container for managing the application's global state.
Redux Toolkit: A library that simplifies Redux's boilerplate code and provides a more intuitive API(async thunks)

- Back-end:
Java: A general-purpose programming language that is widely used for enterprise applications.
Spring Boot: A framework that simplifies the development of Java applications, particularly web-based ones.
Authentication and Security: Built-in features of Spring Security for managing user authentication and securing the application.

* Features

- User Functionality:

Search Books: Users can search for books in the library based on title, author, or other criteria.
Sort Books: Users can sort the list of books by genres such as novel, science, adventure, fiction, etc.
Borrow Books: Users can borrow books by signing in and selecting the desired books. A return deadline of 3 weeks is provided.
Like Books: Users can like their favorite books and view their liked books.

- Admin Functionality:

Update Books: Admins can update the details of existing books in the library.
Delete Books: Admins can remove books from the library.
Add Books: Admins can add new books to the library.
View Transactions: Admins can view the transaction history of borrower books.

* Getting Started
To get started with the Library Management System, follow these steps:

Clone the repository to your local machine.
Set up the front-end:
Navigate to the front-end directory.
Install the dependencies using npm install.
Start the development server using npm start.
Set up the back-end:
Navigate to the back-end directory.
Configure the database connection and other necessary configurations in the application.properties file.
Build and run the Spring Boot application.
Access the application in your browser at http://localhost:3000 (or a different port if specified).