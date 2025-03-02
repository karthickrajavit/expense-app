import { useState } from "react";
import { useCategories } from "../context/CategoryContext";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function CategoryManager() {
  const { categories, setCategories } = useCategories();
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]); // Update Global State
      setNewCategory("");
    }
  };

  const deleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category)); // Update Global State
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="new-category" label="Enter new category" variant="standard" value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)} />
        <Button variant="contained" onClick={addCategory} >Add</Button>
      </Box>
      {/* Add Category Input */}
      {/* <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 flex-grow rounded"
        />
        <button onClick={addCategory} className="bg-green-500 text-white px-4 rounded">
          Add
        </button>
      </div> */}

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {categories.map((category, index) => (
          <ListItem>

            <ListItemText primary={category} />
            <Button variant="contained" onClick={() => deleteCategory(category)} >Delete</Button>
          </ListItem>
        ))}

      </List>

      {/* Category List */}
      {/* <ul className="mt-4">
        {categories.map((category, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            {category}
            <button
              onClick={() => deleteCategory(category)}
              className="text-red-500"
            >
              x
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
