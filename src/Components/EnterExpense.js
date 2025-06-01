import { useState, useEffect } from "react";
import { useCategories } from "../context/CategoryContext";
import { getCategories, addExpense } from "../api/apiService";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { addCategoryApi } from "../api/apiService";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

export default function EnterExpense() {
  // const { categories } = useCategories();
  const { categories, setCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isNewCategory, setIsNewCategory] = useState(false); // State to track if the category is new
  const [isCategorySelected, setIsCategorySelected] = useState(false); // State to track if a category is selected

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const isSearchEnabled = selectedCategory && amount; // test if both fields are filled

  const handleAddCategory = async () => {
    if (!selectedCategory.trim()) return;
    try {
      const newCategory = await addCategoryApi({ name: selectedCategory });
      setCategories([...categories, newCategory]); // Update the categories list
      setIsNewCategory(false); // Hide the button after adding the category
      setSelectedCategory(newCategory.name); // Set the selected category to the newly added one
      setIsCategorySelected(true); // Mark the category as selected
      console.log("Category added:", newCategory);
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    // Check if the entered category exists
    const categoryExists = categories.some(
      (category) => category.name.toLowerCase() === newValue?.toLowerCase()
    );
    setIsCategorySelected(categoryExists); // Update category selection state
    setIsNewCategory(!categoryExists && newValue?.trim() !== ""); // Show button if it's a new category
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log when the submit button is clicked
    console.log("Submit button clicked");

    if (!selectedCategory || !amount) {
      console.error("Category or amount is not selected or empty");
      return;
    }
    if (!isCategorySelected) {
      console.error("No category selected or added");
      return;
    }
    const selectedCategoryObj = categories.find(
      (category) => category.name === selectedCategory
    );
    const { _id } = selectedCategoryObj;
    const apiDate = selectedDate.format("YYYY-MM-DD");
    const resultTags = tags.split(",").map((tag) => tag.trim());

    // Log the final payload before sending the API request
    const expensePayload = { category: _id, amount, apiDate, tags: resultTags };
    console.log("Expense Payload:", expensePayload);
    await addExpense(expensePayload);
    setAmount("");
    setTags("");
    console.log("Expense Saved:", { selectedCategory, apiDate, tags });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Enter Expense</h2>
      <FormControl variant="filled">
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <InputLabel id="select-category"></InputLabel>
          {/* Autocomplete for Category */}
          <Box display="flex" alignItems="center">
            <Autocomplete
              id="select-category"
              options={categories.map((category) => category.name)} // Extract category names
              value={selectedCategory}
              onChange={handleCategoryChange}
              freeSolo
              sx={{ width: "100%" }} // Adjust width as needed
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Category"
                  variant="standard"
                  placeholder="Type to search..."
                  sx={{ width: "100%" }} // Adjust width as needed
                />
              )}
            />
            {/* Button to add new category */}
            {/* Show button only if the category is new */}
            {isNewCategory && (
              <Button
                variant="outlined"
                size="small" // Adjust size as needed
                sx={{ marginLeft: 1 }}
                onClick={handleAddCategory}
              >
                Add Category
              </Button>
            )}
          </Box>

          {/* TextField for Amount */}

          <TextField
            id="enter-amount"
            label="Enter Amount"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setAmount(value);
              }
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              variant="standard"
              format="DD-MM-YYYY"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </LocalizationProvider>

          <TextField
            id="tags"
            label="Enter Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <Button
            sx={{
              fontSize: "12px",
              padding: "4px 8px",
              minWidth: "60px",
              height: "30px",
            }}
            variant="contained"
            disabled={!isSearchEnabled}
            onClick={handleSubmit}
          >
            Submit Expense
          </Button>
        </Box>
      </FormControl>
    </div>
  );
}
