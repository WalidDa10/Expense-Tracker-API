# Expense Tracker API
A RESTful API backend project built with Node.js, Express.js, and MongoDB, featuring user authentication (JWT), expense management, and filtered expense reporting
 ![](images/expense-tracker-api.png)
 ##🛠️ Tools & Setup:
###Prerequisites
Environment Setup

Install Node.js (v18+ recommended).

Initialize Express.js for the server (npm install express).

###Database
Run MongoDB locally via Docker (recommended).
Guide to installing Docker and running MongoDB locally in your device: https://www.youtube.com/watch?v=TsNUchjn-uI&t=285s

###✨ Key Features
User Authentication

Sign up new users.

JWT generation/validation for secure endpoints.

Expense Management

Add, update, and delete expenses.

Filter expenses by:

Past week

Last month

Last 3 months

###🔒 Security
Protected routes using ###JWT (JSON Web Tokens).

Middleware for requester identification and authorization
