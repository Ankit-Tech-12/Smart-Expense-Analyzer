# 💸 Smart Expense Analyzer

A full-stack personal finance management application built with the **MERN stack**.

Users can record income and expenses as transactions, track their balance, and understand their financial activity through category-wise and monthly analytics.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#️-project-structure)
- [Application Flow](#-application-flow)
- [Authentication Flow](#-authentication-flow)
- [Redux State Management](#-redux-state-management)
- [Financial Summary](#-financial-summary)
- [Category Analytics](#-category-analytics)
- [Monthly Analytics](#-monthly-analytics)
- [Data Security](#-data-security)
- [Database Design](#-database-design)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#️-environment-variables)
- [Local Installation](#-local-installation)
- [Deployment](#-deployment)
- [Error Handling](#-error-handling)
- [What I Learned](#-what-i-learned)

---

## 🚀 Features

### 🔐 Authentication

- User registration, login and logout
- JWT-based authentication (access + refresh tokens)
- HTTP-only cookie-based authentication
- Persistent authentication using the authenticated session
- Protected API routes
- Password hashing using bcrypt

### 💰 Transaction Management

- Add, edit and delete transactions
- View transaction history
- Separate **income** and **expense** types
- Category-based transactions
- Transaction date and source
- Optional transaction notes
- User-specific transactions

### 📊 Financial Dashboard

- Total income, total expenses and current balance
- Monthly income and spending comparison
- Category-wise income and expense summary
- Financial visualizations

### 📈 Analytics

- Income and expenses by category
- Monthly income, expenses and balance
- Current month vs previous month comparison
- Pie charts for category distribution
- Bar charts for monthly comparison

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Recharts
- Axios
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS

### Deployment

| Layer    | Platform |
| -------- | -------- |
| Frontend | Vercel   |
| Backend  | Render   |
| Database | MongoDB  |

---

## 🏗️ Project Structure

```text
Smart-Expense-Analyzer/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── transactions/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── .env
│   └── ...
│
├── server/
│   ├── constants/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── ...
│
└── README.md
```

---

## 🔄 Application Flow

```text
User
 ↓
React Frontend
 ↓
Axios
 ↓
Express.js API
 ↓
JWT Authentication Middleware
 ↓
Controller
 ↓
Mongoose Model
 ↓
MongoDB
 ↓
API Response
 ↓
Redux / React Components
 ↓
User Interface
```

---

## 🔐 Authentication Flow

1. User registers or logs in.
2. Backend validates the user credentials.
3. Password is hashed using bcrypt before being stored.
4. Backend generates access and refresh JWT tokens.
5. Authentication information is stored using HTTP-only cookies.
6. Protected requests pass through JWT middleware.
7. The middleware verifies the access token.
8. The authenticated user is attached to `req.user`.
9. Controllers use `req.user._id` to access the user's data.

---

## 📦 Redux State Management

Redux Toolkit is used to manage global application state.

```text
Redux Store
│
├── auth
│   ├── user
│   ├── isAuthenticated
│   └── loading
│
└── transactions
    ├── transactions
    ├── monthlyAnalytics
    └── categoryAnalytics
```

### Authentication State

The `auth` slice manages:

- Current user
- Authentication status
- Authentication loading state

### Transaction State

The `transactions` slice manages:

- Transaction list
- Monthly analytics
- Category-wise analytics

Actions include:

```text
addTransaction
setTransaction
removeTransaction
updateTransaction
setMonthlyAnalytics
setCategoryAnalytics
```

### Analytics State

Analytics data is shared across different pages through Redux. This allows the Dashboard and Analytics pages to access the same monthly and category-wise data without making separate API requests from every component.

---

## 📊 Financial Summary

The application provides an overall financial summary containing:

```text
Total Income
Total Expenses
Balance
```

The balance is calculated as:

```text
Balance = Total Income - Total Expenses
```

For example:

```text
Income  = ₹50,000
Expense = ₹32,000
Balance = ₹18,000
```

The summary is calculated using transactions belonging to the authenticated user.

---

## 📈 Category Analytics

The application groups transactions based on their categories.

### Income

```text
Income
├── Salary
├── Freelance
├── Business
├── Investment
└── Other
```

### Expenses

```text
Expenses
├── Food
├── Transport
├── Rent
├── Health
├── Shopping
├── Entertainment
└── Other
```

The category analytics data is used to display:

- Category summaries
- Income distribution
- Expense distribution
- Pie charts

---

## 📅 Monthly Analytics

Transactions are grouped by month using the transaction date.

Example:

```text
2026-08
2026-09
2026-10
```

Each month contains:

```text
Income
Expense
Balance
```

This data is used for:

- Monthly income comparison
- Monthly spending comparison
- Monthly charts
- Dashboard analytics
- Analytics page

The application compares the current month with the previous month to show whether income or spending has increased or decreased.

---

## 🔒 Data Security

Each transaction belongs to an authenticated user.

The transaction owner is assigned using the authenticated user's ID:

```js
owner: req.user._id
```

The backend does not trust the user ID sent from the frontend.

For update and delete operations, the backend checks both:

```js
_id: id,
owner: req.user._id
```

This ensures that a user can only modify or delete their own transactions.

---

## 🗄️ Database Design

### User Model

```text
User
├── fullName
├── email
├── password
├── refreshToken
├── createdAt
└── updatedAt
```

### Transaction Model

```text
Transaction
├── amount
├── type
├── category
├── source
├── date
├── note
├── owner
├── createdAt
└── updatedAt
```

The `owner` field references the User model:

```js
owner: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true
}
```

### Database Index

The transaction collection uses an index:

```js
transactionSchema.index({
  owner: 1,
  date: -1
});
```

This helps optimize queries that retrieve a user's transactions while sorting them by date.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/v1/user/register` | Register a new user      |
| POST   | `/api/v1/user/login`    | Login user               |
| GET    | `/api/v1/user/me`       | Get current authenticated user |
| POST   | `/api/v1/user/logout`   | Logout user              |

### Transactions

| Method | Endpoint                                | Description            |
| ------ | --------------------------------------- | ---------------------- |
| POST   | `/api/v1/transaction/create`            | Create a transaction   |
| GET    | `/api/v1/transaction/getTransactionList`| Get all transactions   |
| PUT    | `/api/v1/transaction/update/:id`        | Update a transaction   |
| DELETE | `/api/v1/transaction/delete/:id`        | Delete a transaction   |

### Analytics

| Method | Endpoint                         | Description                  |
| ------ | -------------------------------- | ---------------------------- |
| GET    | `/api/v1/transaction/summary`    | Get financial summary        |
| GET    | `/api/v1/transaction/analytics`  | Get category-wise analytics  |
| GET    | `/api/v1/transaction/monthly`    | Get monthly analytics        |

---

## ⚙️ Environment Variables

The project uses separate environment variables for the frontend and backend.

### Frontend

Create `client/.env` and add:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

For production:

```env
VITE_API_URL=https://your-backend-url/api/v1
```

### Backend

Create `server/.env` and add:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

ORIGIN_URI=http://localhost:5173

SECURE=false
SAMESITE=lax
```

### Production

For a deployed frontend and backend, the values for CORS and cookies need to be changed according to the deployment environment.

```env
ORIGIN_URI=https://your-frontend-url
SECURE=true
SAMESITE=none
```

> **Important:** `SECURE` and `SAMESITE` depend on where the application is running.
>
> **Local development:**
>
> ```env
> SECURE=false
> SAMESITE=lax
> ```
>
> **Production** with a frontend and backend running on different domains:
>
> ```env
> SECURE=true
> SAMESITE=none
> ```

⚠️ Do **not** commit `.env` files or secret values to GitHub.

---

## 💻 Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ankit-Tech-12/Smart-Expense-Analyzer.git
```

### 2. Navigate into the project

```bash
cd Smart-Expense-Analyzer
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 5. Configure environment variables

Create:

```text
client/.env
server/.env
```

and add the required environment variables (see [Environment Variables](#️-environment-variables)).

### 6. Start the backend

```bash
cd server
npm run dev
```

The backend will run on:

```text
http://localhost:8000
```

### 7. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 🚀 Deployment

The application is designed to deploy the frontend and backend separately.

### Frontend

The React frontend can be deployed using **Vercel**.

Make sure the production environment variable contains the deployed backend API URL:

```env
VITE_API_URL=https://your-backend-url/api/v1
```

### Backend

The Express backend can be deployed using **Render**.

Configure the backend environment variables in the Render dashboard.

For production cookies:

```env
SECURE=true
SAMESITE=none
```

and configure:

```env
ORIGIN_URI=https://your-frontend-url
```

---

## 🧠 Error Handling

The backend uses reusable utilities for handling API errors and responses.

| Utility        | Purpose                                                  |
| -------------- | -------------------------------------------------------- |
| `asyncHandler` | Handles errors from asynchronous controller functions    |
| `ApiError`     | Creates consistent API errors with HTTP status codes     |
| `ApiResponse`  | Returns a consistent API response structure              |

This keeps the controller code cleaner and makes API responses easier to manage.

---

## 🎯 What I Learned

- Building a full-stack application with the MERN stack
- Implementing secure JWT authentication with HTTP-only cookies
- Managing global state with Redux Toolkit
- Designing user-specific data access and ownership checks
- Building analytics with grouped data and chart visualizations
- Deploying a frontend and backend separately with correct CORS and cookie configuration

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).