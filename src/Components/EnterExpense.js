import { useState, useEffect } from "react";
import { useCategories } from "../context/CategoryContext";
import { getCategories, addExpense } from "../api/apiService";
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

export default function EnterExpense() {
  // const { categories } = useCategories();
  const { categories, setCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !amount) return;
    const selectedCategoryObj = categories.find(category => category.name === selectedCategory);
    const { _id } = selectedCategoryObj;
    await addExpense({ category: _id, amount, date, tags: tags.split(",") });
    setAmount("");
    setTags("");
    console.log("Expense Saved:", { selectedCategory, date, tags });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Enter Expense</h2>
      <FormControl variant="filled">
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
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
          <TextField id="enter-amount" label="Enter Amount" value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setAmount(value);
              }
            }} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              variant="standard"
              format="DD-MM-YYYY"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => <TextField {...params} variant="standard" />}
            />
          </LocalizationProvider>


          <TextField id="tags" label="Enter Tags" value={tags}
            onChange={(e) => setTags(e.target.value)} />


          <Button sx={{ fontSize: "12px", padding: "4px 8px", minWidth: "60px", height: "30px" }} variant="contained" onClick={handleSubmit} >Submit Expense</Button>
        </Box>

      </FormControl>

    </div>
  );
}
