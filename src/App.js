import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import CategoryManager from "./Components/CategoryManager";
import EnterExpense from "./Components/EnterExpense";
import ViewExpense from "./Components/ViewExpense";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



const TabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Manage Categories", path: "/" },
    { label: "Enter Expense", path: "/expense" },
    { label: "View Expense", path: "/view-expense" },
  ];

  // Find the active tab index based on the current path
  const currentTab = tabs.findIndex(tab => tab.path === location.pathname);

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
  return (
    <CategoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Expense Tracker</h1>


          <TabNavigation />
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
