import { useState, useEffect } from "react";
import { useCategories } from "../context/CategoryContext";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import { Autocomplete } from "@mui/material";
import { getExpenses, getCategories } from "../api/apiService";

export default function ViewExpense() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(null);
  const [relativeTime, setRelativeTime] = useState("");
  const relativeTimeOptions = ["Today", "This Week", "This Month"];
  const { categories, setCategories } = useCategories();
  const [dateRange, setDateRange] = useState(null);

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
    }
    else if (relativeTime === "This Month") {
      startDate = today.startOf("month");
      endDate = today.endOf("month");
    }
    setDateRange({ startDate, endDate });
  };

  // Check if at least one field is filled
  const isSearchEnabled = selectedCategory || tags || date || relativeTime;

  const handleSearch = () => {
    const selectedCategoryObj = categories.find(category => category.name === selectedCategory);
    const categoryId = selectedCategoryObj ? selectedCategoryObj._id : null;
    const formattedDate = date ? date.format("YYYY-MM-DD") : null; // Format the date to exclude the time part


    getExpenses({ category: categoryId, tags, date: formattedDate, dateRange }); // Pass the category ID and formatted date
    console.log("Search Criteria:", {
      category: categoryId,
      tags,
      date: formattedDate,
      relativeTime,
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">View Expenses</h2>


      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        variant="filled"
      >
        {/* <Autocomplete
          options={categories} // List of options
          value={selectedCategory} // Selected value
          onChange={(event, newValue) => setSelectedCategory(newValue)}
          renderInput={(params) => <TextField {...params} label="Select a category" />}
        /> */}

        <InputLabel id='select-category'>Select Category</InputLabel>
        <Select
          labelId='select-category'
          id='select-category'
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

        <TextField id="tags" label="Enter Tags (Optional)"
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
            renderInput={(params) => <TextField {...params} variant="standard" />}
          />
        </LocalizationProvider>

        <InputLabel id='select-time' variant="filled">Relative Time (Optional)</InputLabel>
        <Select
          labelId='select-time'
          variant="filled"
          id='select-time'
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

        <Button sx={{ fontSize: "12px", padding: "4px 8px", minWidth: "60px", height: "30px" }} variant="contained" onClick={handleSearch}
          disabled={!isSearchEnabled} >Search</Button>

      </Box>
    </div>
  );
}
