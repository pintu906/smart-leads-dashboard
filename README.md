# Smart Leads Dashboard

A full-stack MERN Lead Management Dashboard built using React, TypeScript, Node.js, Express.js, MongoDB, and TailwindCSS.

---

## Features

- JWT Authentication
- User Registration & Login
- Role Based Access Control (Admin / Sales User)
- Protected Routes
- Lead CRUD Operations
- Search & Filtering
- Pagination
- CSV Export
- Responsive Dashboard UI
- TypeScript Support
- REST API Architecture

---

## Tech Stack

### Frontend
- React.js
- TypeScript
- TailwindCSS
- Axios
- React Router DOM
- Zustand

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## Folder Structure

```bash
frontend/
backend/
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

cd backend

npm install

npm run dev

cd frontend

npm install

npm run dev

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/leads     |
| POST   | /api/leads     |
| GET    | /api/leads/:id |
| PUT    | /api/leads/:id |
| DELETE | /api/leads/:id |
Search & Filtering

Supports:

Filter by Status
Filter by Source
Search by Name or Email
Sort by Latest / Oldest
Pagination
Backend Pagination
10 Records Per Page
CSV Export

Users can export leads data as CSV.
