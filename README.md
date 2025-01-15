# Login & Review Management System

## Project Overview

This is a simple Login and Review Management System where users can log in, register, and manage their reviews. Admin users have additional privileges to delete reviews. This project demonstrates user authentication, profile management, and review CRUD operations.

## Features

### 1. **User Login**
   - Users can log in using their email and password.
   - If the login credentials are incorrect, a popup will notify the user about the issue.

### 2. **User Registration**
   - New users can register by providing their email and password.
   - After successful registration, the user will be redirected to their profile page.

### 3. **Profile Page**
   - After logging in or registering, users will be redirected to their profile page.
   - On the profile page, users can view their username and email.
   - Users can add reviews and update them.

### 4. **Review Management**
   - Users can add new reviews and modify existing ones.
   - Admin users have the ability to delete reviews, ensuring efficient management of the review system.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (or any database you are using)
- **Authentication**: JWT (JSON Web Token)
  
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MaheshM7/Login_Signup.git

Install dependencies for both frontend and backend:

For the frontend:
cd frontend
npm install
npm run dev

For the backend:
cd backend
npm install
npm run dev
