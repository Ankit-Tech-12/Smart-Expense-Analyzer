# 💰 Smart Expense Analyzer

Smart Expense Analyzer is a **React + Redux Toolkit** based expense tracking and analytics application that helps users **record, analyze, and visualize their spending patterns** with real-time insights.

This project focuses on **clean state management, derived analytics, and scalable frontend architecture**.

---

## 🚀 Features

- ➕ Add and remove expenses with amount, category, date, and notes
- 📊 Total expense calculation using memoized selectors
- 🧩 Category-wise expense aggregation
- 📅 Monthly comparison (current month vs previous month)
- 🚨 Spending spike detection for unusual increases
- 💾 Persistent data using `localStorage`
- 📈 Visual analytics using Pie and Bar charts
- 🎯 Controlled category selection to avoid data inconsistency
- 📱 Fully responsive dashboard layout for mobile, tablet, and desktop

---

## 🧠 Architecture & Design

- Redux stores **only raw data** (expenses and categories)
- All analytics are implemented as **derived state**
- Uses `createSelector` for **memoization and performance**
- Clear separation of concerns:
  - UI components
  - Redux slices
  - Selectors (analytics layer)
- Reducers remain **pure** with no side effects

---

## 🛠 Tech Stack

- **Frontend:** React, JavaScript
- **State Management:** Redux Toolkit, React-Redux
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Persistence:** localStorage

---

## 📂 Project Structure

```txt
src/
 ├─ App/
 │   ├─ components/
 │   │   ├─ AddExpense.jsx
 │   │   ├─ ExpenseList.jsx
 │   │   ├─ TotalExpense.jsx
 │   │   ├─ CategorySummary.jsx
 │   │   ├─ CategoryPieChart.jsx
 │   │   ├─ MonthlyComparison.jsx
 │   │   ├─ MonthlyBarChart.jsx
 │   │   └─ SpendingSpikeAlert.jsx
 │   ├─ features/
 │   │   ├─ expenses/
 │   │   │   ├─ expensesSlice.js
 │   │   │   └─ expensesSelectors.js
 │   │   └─ categories/
 │   │       └─ categoriesSlice.js
 │   ├─ utils/
 │   │   └─ localStorage.js
 │   ├─ store.js
 │   └─ App.jsx
 ├─ assets/
 ├─ index.css
 └─ main.jsx



---

## 📊 Analytics Overview

- **Total Expenses:** Sum of all expense amounts
- **Category Totals:** Aggregated using `reduce`
- **Monthly Comparison:** Current vs previous month spending
- **Spending Spike Detection:** Alerts when spending increases by ≥25%

All analytics are implemented using **memoized Redux selectors**, not stored state.

---

## 🧪 Running the Project Locally

```bash
git clone https://github.com/Ankit-Tech-12/Smart-Expense-Analyzer.git
cd smart-expense-analyzer
npm install
npm run dev


Open in browser:
http://localhost:5173/

---

## 🧠 Key Learnings

- Proper Redux Toolkit usage with scalable state design
- Memoized selectors for derived analytics
- Real-world analytics implementation without a backend
- Persistent Redux state handling using `localStorage`
- Debugging and handling chart rendering edge cases

---

## 🔮 Future Enhancements

- ✏️ Edit expense functionality
- 📂 Category management UI
- 🌙 Dark mode
- 🔐 Backend integration with authentication
- 📱 Mobile-first responsive improvements

---


 
