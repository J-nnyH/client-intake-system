# Client Management API

Simple REST API for managing client data.

Built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
This project demonstrates CRUD operations, API routing, and database integration.

## Features

- Create clients
- Retrieve all clients
- Update existing clients
- Delete clients
- Email uniqueness validation
- Basic request validation

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors

## API Endpoints

GET `/api/`  
Returns all clients.

POST `/api/create`  
Creates a new client.

PUT `/api/update/:id`  
Updates an existing client.

DELETE `/api/delete/:id`  
Deletes a client.

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

- Authentication (JWT)
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
