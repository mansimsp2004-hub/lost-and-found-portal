# Lost and Found Portal

## About the Project

The Lost and Found Portal is a web application that helps people report lost items and found items. It provides a simple platform where users can share item details and help reconnect lost belongings with their owners.

## Objectives

- Make it easy to report lost items.
- Allow users to report items they have found.
- Store item details in a database.
- Help people find and recover their belongings.

## Features

- Report lost and found items.
- Enter item name, category, description, and location.
- Store contact information for communication.
- View item records through the backend API.
- Manage item records using CRUD operations.

## Technologies Used

**Frontend**
- React.js
- Vite
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Development Tools**
- Visual Studio Code
- Git and GitHub
- npm

## Project Structure

```text
lost-and-found-portal/
├── client/          # React frontend
├── server/          # Express backend
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── server.js    # Backend entry point
│   └── package.json
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

Install Node.js and MongoDB before running the application.

### 1. Clone the Repository

```bash
git clone https://github.com/mansimsp2004-hub/lost-and-found-portal.git
cd lost-and-found-portal
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder with the following configuration:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lost_found_db
```

Start the backend:

```bash
npm run dev
```

The backend should run at `http://localhost:5000`.

### 3. Set Up the Frontend

Open a **second terminal** in VS Code and run:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/items` | Retrieve all items |
| POST | `/api/items` | Add a new item |
| GET | `/api/items/:id` | Retrieve one item |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

## Future Enhancements

- User registration and login.
- Search and filter items by category and location.
- Image uploads for lost and found items.
- Item claim and return tracking.
- Improved responsive design.

## Author

**Mansi Patil**

GitHub: [mansimsp2004-hub](https://github.com/mansimsp2004-hub)

---

This project is developed for learning and demonstrating full-stack web development.
