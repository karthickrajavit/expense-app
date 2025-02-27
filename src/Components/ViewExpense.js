import { useState } from "react";
import { useCategories } from "../context/CategoryContext";

export default function ViewExpense() {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");
  const [relativeTime, setRelativeTime] = useState("");

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

      {/* Category Dropdown */}
      <div>
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
      </div>

      {/* Tags Input */}
      <div className="mt-3">
        <label className="block text-gray-700">Enter Tags (Optional)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. groceries, travel"
        />
      </div>

      {/* Date Picker */}
      <div className="mt-3">
        <label className="block text-gray-700">Select Date (Optional)</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Relative Time Dropdown */}
      <div className="mt-3">
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
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={!isSearchEnabled}
        className={`w-full mt-4 py-2 rounded text-white ${
          isSearchEnabled ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Search
      </button>
    </div>
  );
}
