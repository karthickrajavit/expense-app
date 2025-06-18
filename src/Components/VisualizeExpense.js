import React, { useEffect, useState } from "react";
import ExpenseCategoryChart from "./ExpenseCategoryChart";
import MonthlyExpenseBarChart from "./MonthlyExpenseBarChart";
import { getMonthlyExpenseSummary } from "../api/apiService";

export default function VisualizeExpense() {
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const data = await getMonthlyExpenseSummary({
          month: "06",
          year: "2025",
        });
        //use specific data from response
        console.log("Monthly Summary Data:", data);
        setMonthlySummary(data);
        // setMonthlySummary(data);
      } catch (err) {
        setError("Failed to fetch monthly summary");
      }
    };
    fetchMonthlySummary();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ExpenseCategoryChart data={monthlySummary} />
      <div style={{ height: 32 }} /> {/* Spacer between charts */}
      <MonthlyExpenseBarChart data={monthlySummary} />
    </div>
  );
}
