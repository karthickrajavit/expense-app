import { useState, useEffect } from "react";
import { useCategories } from "../context/CategoryContext";

export default function EnterExpense() {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Saved:", { selectedCategory, date, tags });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Enter Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Dropdown */}
        <div>
          <label className="block text-gray-700">Select Category</label>
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
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-gray-700">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tags Input */}
        <div>
          <label className="block text-gray-700">Enter Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Submit Expense
        </button>
      </form>
    </div>
  );
}
