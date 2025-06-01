import { createContext, useContext, useState } from "react";

// Create Context
const CategoryContext = createContext();

// Context Provider Component
export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}

// Custom Hook for easy access
export function useCategories() {
  return useContext(CategoryContext);
}
