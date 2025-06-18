import axios from "axios";
import { auth } from "../firebase";

// const API_BASE_URL = "https://uynoi1p5s2.execute-api.ap-south-1.amazonaws.com"; // Adjust if needed
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"; // Use environment variable or default to localhost

export const getCategories = async () => {
  try {
    // Get Firebase ID token from the currently logged-in user
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const token = await user.getIdToken(); // Fetch ID token

    // Set up headers with Authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${API_BASE_URL}/categories`, {
      headers: { ...headers },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const addCategoryApi = async (category) => {
  try {
    // Get Firebase ID token from the currently logged-in user
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const token = await user.getIdToken(); // Fetch ID token

    // Set up headers with Authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${API_BASE_URL}/categories`, category, {
      headers: { ...headers },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
};

export const deleteCategoryApi = async (categoryName) => {
  try {
    // Get Firebase ID token from the currently logged-in user
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const token = await user.getIdToken(); // Fetch ID token

    // Set up headers with Authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.delete(`${API_BASE_URL}/categories/${categoryName}`, {
      headers: { ...headers },
    });
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
};

export const addExpense = async (expense) => {
  try {
    // Get Firebase ID token from the currently logged-in user
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const token = await user.getIdToken(); // Fetch ID token

    // Set up headers with Authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense, {
      headers: { ...headers },
    }); // Send POST request
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    return null;
  }
};

export const getExpenses = async (filters) => {
  try {
    // Get Firebase ID token from the currently logged-in user
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const token = await user.getIdToken(); // Fetch ID token

    // Set up headers with Authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${API_BASE_URL}/expenses`, {
      headers: { ...headers },
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    // Get Firebase ID token from the currently logged-in user
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const token = await user.getIdToken(); // Fetch ID token

    // Set up headers with Authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${API_BASE_URL}/expenses/${expenseId}`,
      {
        headers: { ...headers },
      }
    );
    console.log("Expense deleted:", response.data); // Log the response for debugging
    return true;
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    throw error;
  }
};

export const getMonthlyExpenseSummary = async (filters) => {
  try {
    // Get Firebase ID token from the currently logged-in user
    // wait for the user to be authenticated
    const user = auth.currentUser;
    console.log("Current user:", user); // Log the user for debugging
    const userId = user ? user.uid : null;
    filters.userId = userId; // Add userId to filters
    if (!user) throw new Error("User not authenticated2");

    const token = await user.getIdToken(); // Fetch ID token

    // Set up headers with Authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${API_BASE_URL}/data/summary-by-category`,
      {
        headers: { ...headers },
        params: filters,
      }
    );
    console.log("Monthly expense summary retrieved", response.data); // Log the response for debugging
    const filteredData = response.data.map((item) => ({
      categoryName: item.categoryName,
      amount: item.totalAmount, // or item.amount, depending on your API
    }));
    return filteredData;
  } catch (error) {
    console.error("Error retrieving monthly expense summary", error.message);
    throw error;
  }
};
