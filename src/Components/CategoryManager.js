import { useEffect, useState } from "react";
import { useCategories } from "../context/CategoryContext";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getCategories, addCategoryApi, deleteCategoryApi } from "../api/apiService";
import { data } from "react-router-dom";

export default function CategoryManager() {
  const { categories, setCategories } = useCategories();
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;
    await addCategoryApi({ name: newCategory });
    setNewCategory("");
    fetchCategories();
  };



  const addCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      handleAddCategory();
      const categoryToAdd = { name: newCategory.trim() };
      //setCategories([...categories, newCategory]); // Update Global State
      //setNewCategory("");
    }
  };

  const handleDeleteCategory = async (category) => {
    await deleteCategoryApi(category);
    fetchCategories();
  };

  const deleteCategory = (category) => {
    handleDeleteCategory(category);
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

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {categories.map((category, index) => (
          <ListItem>
            <ListItemText primary={category.name} />
            <Button variant="contained" onClick={() => deleteCategory(category.name)} >Delete</Button>
          </ListItem>
        ))}

      </List>
    </div>
  );
}
