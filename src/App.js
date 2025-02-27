import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import CategoryManager from "./Components/CategoryManager";
import EnterExpense from "./Components/EnterExpense";
import ViewExpense from "./Components/ViewExpense";

function App() {
  return (
    <CategoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Expense Tracker</h1>

          {/* Navigation Bar */}
          <nav className="flex justify-center space-x-6 mb-6 bg-white shadow-md p-3 rounded">
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Manage Categories
            </Link>
            <Link to="/expense" className="text-blue-500 hover:text-blue-700">
              Enter Expense
            </Link>
            <Link to="/view-expense" className="text-blue-500 hover:text-blue-700">
              View Expense
            </Link>
          </nav>

          {/* Page Routes */}
          <Routes>
            <Route path="/" element={<CategoryManager />} />
            <Route path="/expense" element={<EnterExpense />} />
            <Route path="/view-expense" element={<ViewExpense />} /> {/* New Page */}
          </Routes>
        </div>
      </Router>
    </CategoryProvider>
  );
}

export default App;
