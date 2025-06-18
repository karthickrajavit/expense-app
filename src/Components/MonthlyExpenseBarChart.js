import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Typography, Paper } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9c27b0"];

const MonthlyExpenseBarChart = ({ data }) => {
  // Extract category keys dynamically excluding 'month'
  const categories =
    data.length > 0 ? Object.keys(data[0]).filter((k) => k !== "month") : [];

  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Monthly Expenses by Category
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={COLORS[index % COLORS.length]}
              stackId="a"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default MonthlyExpenseBarChart;
// This component renders a bar chart for monthly expenses by category.
// It uses Recharts to create a responsive bar chart with dynamic categories.
