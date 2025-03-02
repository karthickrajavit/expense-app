import { useState } from "react";
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

export default function ViewExpense() {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(dayjs());
  const [relativeTime, setRelativeTime] = useState("");
  const [relativeCategories, setRelativeCategories] = useState(["Today", "This Month"]);


  // Check if at least one field is filled
  const isSearchEnabled = selectedCategory || tags || date || relativeTime;

  const handleSearch = () => {
    console.log("Search Criteria:", {
      selectedCategory,
      tags,
      date,
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
        <Autocomplete
          options={categories} // List of options
          value={selectedCategory} // Selected value
          onChange={(event, newValue) => setSelectedCategory(newValue)}
          renderInput={(params) => <TextField {...params} label="Select a category" />}
        />

        {/* <InputLabel variant="filled" id='select-category'>Select Category</InputLabel>
        <Select
          variant="filled"
          labelId='select-category'
          id='select-category'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Select Category (Optional)"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}

        </Select> */}

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
            onChange={(newDate) => setDate(newDate)}
            renderInput={(params) => <TextField {...params} variant="standard" />}
          />
        </LocalizationProvider>

        <InputLabel id='select-category' variant="filled">Relative Time (Optional)</InputLabel>
        <Select
          labelId='select-category'
          variant="filled"
          id='select-category'
          value={relativeTime}
          onChange={(e) => setRelativeTime(e.target.value)}
          label="Relative Time (Optional)"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {relativeCategories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}

        </Select>

        <Button sx={{ fontSize: "12px", padding: "4px 8px", minWidth: "60px", height: "30px" }} variant="contained" onClick={handleSearch}
          disabled={!isSearchEnabled} >Search</Button>

      </Box>
      {/* Category Dropdown */}
      {/* <div>
        <label className="block text-gray-700">Select Category (Optional)</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select --</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div> */}

      {/* Tags Input */}
      {/* <div className="mt-3">
        <label className="block text-gray-700">Enter Tags (Optional)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. groceries, travel"
        />
      </div> */}

      {/* Date Picker */}
      {/* <div className="mt-3">
        <label className="block text-gray-700">Select Date (Optional)</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div> */}

      {/* Relative Time Dropdown */}
      {/* <div className="mt-3">
        <label className="block text-gray-700">Relative Time (Optional)</label>
        <select
          value={relativeTime}
          onChange={(e) => setRelativeTime(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select --</option>
          <option value="today">Today</option>
          <option value="this_month">This Month</option>
        </select>
      </div> */}

      {/* Search Button */}
      {/* <button
        onClick={handleSearch}
        disabled={!isSearchEnabled}
        className={`w-full mt-4 py-2 rounded text-white ${isSearchEnabled ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
          }`}
      >
        Search
      </button> */}
    </div>
  );
}
