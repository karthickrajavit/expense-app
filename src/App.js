import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import CategoryManager from "./Components/CategoryManager";
import EnterExpense from "./Components/EnterExpense";
import ViewExpense from "./Components/ViewExpense";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { logout } from "./services/authService";
import { useAuth } from "./context/AuthContext";
import { Button } from "@mui/material";
import "./App.css";

const TabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Manage Categories", path: "/" },
    { label: "Enter Expense", path: "/expense" },
    { label: "View Expense", path: "/view-expense" },
  ];

  // Find the active tab index based on the current path
  const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        value={currentTab !== -1 ? currentTab : 0} // Default to first tab if no match
        onChange={(event, newValue) => navigate(tabs[newValue].path)}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

function App() {
  const user = useAuth();

  return (
    <CategoryProvider>
      <Router>
        {user.user != null ? (
          <div>
            <div className="header">
              <h1>Expense Tracker</h1>
              <Button className="logout-btn" onClick={logout}>
                Logout
              </Button>
            </div>
            <TabNavigation />
          </div>
        ) : null}

        {/* Page Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/expense" element={<EnterExpense />} />
            <Route path="/view-expense" element={<ViewExpense />} />
            <Route path="/" element={<CategoryManager />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
          {/* <Route path="/" element={<CategoryManager />} /> */}
          {/* <Route path="/expense" element={<EnterExpense />} /> */}
          {/* <Route path="/view-expense" element={<ViewExpense />} /> New Page */}
        </Routes>
      </Router>
    </CategoryProvider>
  );
}

export default App;
