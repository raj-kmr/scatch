### Backend Learning Project with Node.js and MongoDB

This project is designed to help me learn and practice backend development using Node.js and MongoDB. It includes basic features such as user authentication, product management, and data storage in a MongoDB database. This is a learning exercise to get familiar with backend concepts like routing, middleware, and database integration.

## Features

- User Authentication: Allows users to register and log in to the platform.
- Product Management: Users can view products, add products to their cart, and update their profile.
- Session Management: Uses express-session to manage user sessions and maintain login status across requests.
- Flash Messages: Displays success or error messages to users using connect-flash.
- MongoDB Database: Stores all user and product data in a MongoDB database.

## Tech Stack

- Node.js: JavaScript runtime used for the backend server.
- Express.js: Web framework for building APIs and handling routes.
- MongoDB: NoSQL database used for storing data.
- EJS: Templating engine to render dynamic HTML pages.
- Mongoose: ODM (Object Data Modeling) library for interacting with MongoDB.
- Connect-Flash: Middleware for storing and displaying flash messages.
- Express-session: Middleware for managing user sessions.

## Setup

# Prerequisites

Before you start, ensure that the following tools are installed on your system:

- Node.js: To check if Node.js is installed, run:
  node -v
  If it's not installed, download it from Node.js (https://nodejs.org/).

- MongoDB: You’ll need a MongoDB database. You can either set up a local MongoDB instance or use MongoDB Atlas for a cloud-hosted database.

## Clone the Repository

Clone the project repository to your local machine:
git clone https://github.com/raj-kmr/scatch.git
cd backend-learning-nodejs-mongodb

## Install Dependencies

Install the required dependencies using npm:
npm install

## Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

MONGODB_URI=your_mongodb_connection_url
EXPRESS_SESSION_SECRET=your_secret_key

- MONGODB_URI: This is your MongoDB connection string (for local MongoDB or MongoDB Atlas).
- EXPRESS_SESSION_SECRET: A secret key used for securing the session.

## Run the Application

Once everything is set up, you can start the server by running:
npm start

The application will start running on http://localhost:3000.

##  Usage

- Register and log in as a user.
- View products and add them to your cart.
- Manage user sessions and get flash messages for success or errors.

