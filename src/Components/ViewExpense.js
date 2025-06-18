import { useState, useEffect } from "react";
import { useCategories } from "../context/CategoryContext";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { getExpenses, getCategories, deleteExpense } from "../api/apiService";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";

function createData(id, category, amount, date, tags) {
  return { id, category, amount, date, tags };
}

function BasicTable({ rows, onDelete }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "auto", // Allow the table to shrink to fit its content
        maxWidth: "100%", // Prevent it from exceeding the container width
        margin: "0 auto", // Center the table horizontally
      }}
    >
      <Table
        sx={{
          tableLayout: "auto", // Allow columns to adjust based on content
          width: "auto", // Shrink the table width to fit content
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount spent</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.category}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.tags}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onDelete(row.id)} // Call onDelete with the expense ID
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ViewExpense() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(null);
  const [relativeTime, setRelativeTime] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const relativeTimeOptions = ["Today", "This Week", "This Month"];
  const { categories, setCategories } = useCategories();
  const [dateRange, setDateRange] = useState("");
  const [responseData, setResponseData] = useState([]); // Declare responseData as a state variable
  const [showTable, setShowTable] = useState(false); // Declare showTable as a state variable
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // setDate(new Date().toISOString().split("T")[0]);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const assignDateRange = (relativeTime) => {
    const today = dayjs();
    let startDate = today;
    let endDate = today; // Default to today
    if (relativeTime === "This Week") {
      startDate = today.startOf("week");
      endDate = today.endOf("week");
    } else if (relativeTime === "This Month") {
      startDate = today.startOf("month");
      endDate = today.endOf("month");
    }
    startDate = startDate.format("YYYY-MM-DD"); // Format the date to exclude the time
    endDate = endDate.format("YYYY-MM-DD"); // Format the date to exclude the time

    const datee = startDate + "," + endDate;
    console.log(datee);
    setDateRange(datee);
    console.log(typeof startDate, typeof endDate, typeof dateRange, dateRange);
  };

  // Check if at least one field is filled
  const isSearchEnabled = selectedCategory || tags || date || relativeTime;

  const handleSearch = async () => {
    const selectedCategoryObj = categories.find(
      (category) => category.name === selectedCategory
    );
    const categoryId = selectedCategoryObj ? selectedCategoryObj._id : null;
    const formattedDate = date ? date.format("YYYY-MM-DD") : null; // Format the date to exclude the time part
    const tagsArray = tags ? tags : null;
    const dateRanges = relativeTime ? dateRange : null;

    const filters = {
      category: categoryId,
      tags: tagsArray,
      date: formattedDate,
      dateRange: dateRanges,
    };
    console.log(filters);
    setResponseData([]); // Reset the responseData state variable
    await fetchExpenses(filters);
    setShowTable(true);
  };

  const fetchExpenses = async (filters) => {
    const data = await getExpenses(filters);
    setResponseData(data.expenses);
    setTotalAmount(data.totalExpense);
    console.log(data); // Log the data to the console
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      console.log(`Deleting expense with ID: ${expenseId}`);
      await deleteExpense(expenseId); // Call the delete API
      console.log(`Expense with ID ${expenseId} deleted successfully`);
      // Remove the deleted expense from the state
      setResponseData((prevData) => {
        const updatedData = prevData.filter(
          (expense) => expense._id !== expenseId
        );
        // Recalculate the total amount
        const updatedTotal = updatedData.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setTotalAmount(updatedTotal); // Update the total amount
        console.log("Updated total amount:", updatedTotal);
        console.log("Updated data after deletion:", updatedData); // Log the updated data
        setShowTable(updatedData.length > 0); // Hide the table if no expenses left
        return updatedData; // Update the responseData state
      });
    } catch (error) {
      console.error("Error deleting expense:", error.message);
    }
  };

  const rows = responseData.map((expense) => {
    console.log(expense, "expense in view expense");
    return createData(
      expense._id, // Assuming expense._id is the unique identifier for the expense
      expense.category.name,
      expense.amount,
      dayjs(expense.date).format("DD-MM-YYYY"),
      expense.tags.join(", ")
    );
  });

  const allTags = Array.from(
    new Set(rows.flatMap((row) => row.tags.split(",").map((tag) => tag.trim())))
  ).filter((tag) => tag); // Remove empty strings

  const filteredRows = tagFilter
    ? rows.filter((row) =>
        row.tags
          .split(",")
          .map((tag) => tag.trim())
          .includes(tagFilter)
      )
    : rows;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">View Expenses</h2>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        variant="filled"
      >
        <InputLabel id="select-category">Select Category</InputLabel>
        <Select
          labelId="select-category"
          id="select-category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Select Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          id="tags"
          label="Enter Tags (Optional)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. groceries, travel"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date (Optional)"
            variant="standard"
            format="DD-MM-YYYY"
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
              if (newDate) {
                setRelativeTime(""); // Reset relative time if date is selected
              }
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
        </LocalizationProvider>

        <InputLabel id="select-time" variant="filled">
          Relative Time (Optional)
        </InputLabel>
        <Select
          labelId="select-time"
          variant="filled"
          id="select-time"
          value={relativeTime}
          onChange={(e) => {
            setRelativeTime(e.target.value);
            if (e.target.value) {
              assignDateRange(e.target.value);
              setDate(null); // Reset date if relative time is selected
            }
          }}
          label="Relative Time (Optional)"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {relativeTimeOptions.map((relativeTime, index) => (
            <MenuItem key={index} value={relativeTime}>
              {relativeTime}
            </MenuItem>
          ))}
        </Select>

        <FormControl variant="standard" sx={{ minWidth: 120, marginLeft: 2 }}>
          <InputLabel id="tag-filter-label">Filter by Tag</InputLabel>
          <Select
            labelId="tag-filter-label"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            label="Filter by Tag"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {allTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" alignItems="center">
          <Button
            sx={{
              fontSize: "12px",
              padding: "4px 8px",
              minWidth: "60px",
              height: "30px",
            }}
            variant="contained"
            onClick={handleSearch}
            disabled={!isSearchEnabled}
          >
            Search
          </Button>
          {showTable && (
            <Box ml={2}>
              <strong>Total: </strong>INR {totalAmount}
            </Box>
          )}
        </Box>
      </Box>
      {/* Render the BasicTable component */}
      {showTable && (
        <BasicTable rows={filteredRows} onDelete={handleDeleteExpense} />
      )}
    </div>
  );
}
