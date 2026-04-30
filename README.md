# Task Manager - UI (Frontend)

This is the user interface for the Enterprise Task Manager application. It is built using React and Vite to provide a modern, fast, and modular structure.

## 🛠 Tech Stack

- **Library:** React
- **Build Tool:** Vite
- **API Communication:** Fetch API
- **Styling:** CSS3 (Modular and Responsive)

## Installation and Setup

**Node.js** must be installed on your machine to run this project locally.

### 1. Clone the Project

> **Important Note:** If you are planning to run this alongside the Backend project in the same directory structure, it is highly recommended to clone this repository into a folder named `taskmanager-ui`:

```bash
git clone https://github.com/Erenvdmn/TaskManager-Frontend.git taskmanager-ui
cd taskmanager-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm run dev
```

The application will start running by default at `http://localhost:5173`.

## 🔌 API & Database Connection

This frontend application relies on the Backend API to function fully.

- The frontend sends requests to `https://localhost:7152` by default.
- The PostgreSQL database is managed entirely by the Backend's Docker configuration.

To set up the backend and database, please visit the backend repository:
[TaskManager-Backend Repository](https://github.com/Erenvdmn/TaskManager-Backend)
