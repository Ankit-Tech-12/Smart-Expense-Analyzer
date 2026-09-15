import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthCheck from "./components/AuthCheck";
import ExpenseCheck from "./components/ExpenseCheck";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AddExpensePage from "./pages/AddExpensePage";
import ExpensesPage from "./pages/ExpensesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <AuthCheck />
      <ExpenseCheck />
      <Routes>

        {/* public route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddExpensePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
