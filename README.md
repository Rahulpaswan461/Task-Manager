# Todo Manager Application
The Todo Manager Application is a web-based tool designed to help users manage their tasks effectively by organizing them into projects and tracking their completion status.

## Features
- User authentication using cookies and JWT tokens.
- CRUD operations for managing projects and todos entries ( Unique Id, Title, Created Date, List of Todos.).
- Basic security measures implemented, including password hashing using the crypto module.
- Separation of concerns with distinct models for users and projects and todos.
- Use of middleware for authentication checks.
- Use of EJS for rendering some frontend views.

- ## Getting Started
### Prerequisites
- Node.js installed on your machine.
- MongoDB database instance.

- ## Installation
- Clone the repository: git clone https://github.com/Rahulpaswan461/Book-Management-API
- Navigate to the project directory: cd Book-Management
- Install dependencies: npm install

- 
# Usage
- Start the server: npm start
- Use API endpoints with tools like Postman or cURL.
- POST /user/signup: Register a new user.
- POST /user/signin: Log in with existing user credentials.

- ## Project
- GET /projects
- Description: Get all projects created by the authenticated user.
- GET /projects/:projectId
- Description: Get project details by project ID.
- POST /projects
- Description: Create a new project.
- PATCH /projects/:projectId
- Description: Update a project by ID.

- ## TODO
- GET /todos/:projectId
- Description: Get all todos for a specific project.
- POST /todos/:projectId
- Description: Create a new todo for a specific project.
- PUT /todos/:todoId
- Description: Update a todo by ID.
- DELETE /todos/:todoId
- Description: Delete a todo by ID.

- # Security
Input validation is implemented to prevent malicious data.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
