import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthCheck from "./components/AuthCheck";
import TransactionCheck from "./components/TransactionCheck";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AddTransactionPage from "./pages/AddTransactionPage";
import TransactionsPage from "./pages/TransactionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditTransaction from "./components/EditTransaction";

const App = () => {
  return (
    <BrowserRouter>
      <AuthCheck />
      <TransactionCheck />
      <Routes>

        {/* public route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransactionPage />} />
            <Route path="/expenses" element={<TransactionsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/expenses/edit/:id" element={<EditTransaction />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
