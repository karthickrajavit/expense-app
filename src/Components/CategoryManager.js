import { useState } from "react";
import { useCategories } from "../context/CategoryContext";

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

      {/* Add Category Input */}
      <div className="flex gap-2">
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
      </div>

      {/* Category List */}
      <ul className="mt-4">
        {categories.map((category, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            {category}
            <button
              onClick={() => deleteCategory(category)}
              className="text-red-500"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
