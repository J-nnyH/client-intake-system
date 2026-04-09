# Client Management API

Backend for managing clients and user authentication.

Built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
This project demonstrates CRUD operations, API routing, and database integration.

## Features

- Create, retrieve, update, delete clients (CRUD)
- Email uniqueness validation
- Basic request validation
- User authentication & registration (JWT, HTTP-only cookies)
- Guest accounts with automatic cleanup via MongoDB TTL indexes
- Protected routes based on auth status

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Auth
- dotenv
- cors

## API Endpoints

Auth:

POST `/api/auth/register`  
User registration

POST `/api/auth/login`  
User login

POST `/api/auth/guest`  
Temporary guest login

POST `/api/auth/logout`  
User Logout


Clients:

GET `/api/`  
Returns all clients

POST `/api/create`  
Creates a new client

PUT `/api/update/:id`  
Updates an existing client

DELETE `/api/delete/:id`  
Deletes a client

## Environment Variables

Create a `.env` file:


DB_STRING=your_mongodb_connection_string

FRONTEND_URL=your_frontend_url

PORT=8080


## Installation

Install dependencies:


npm install


Start the server:


npm start

## Future Improvements

Possible improvements for the project:

- Rate Limitingto prevent brute-force attacks and abuse
- Refresh Tokens for Sessions
- Pagination for client lists
- Input validation library (Joi / Zod)
- API documentation with Swagger
- Unit tests

## Purpose

This project was created as a portfolio backend project to practice:

- REST API design
- Express routing
- MongoDB data modeling
- Backend project structure
- Authentication & session management
