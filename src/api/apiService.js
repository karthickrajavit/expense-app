import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust if needed

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const addCategoryApi = async (category) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories`, category);
        return response.data;
    } catch (error) {
        console.error("Error adding category:", error);
        return null;
    }
};

export const deleteCategoryApi = async (categoryName) => {
    try {
        await axios.delete(`${API_BASE_URL}/categories/${categoryName}`);
        return true;
    } catch (error) {
        console.error("Error deleting category:", error);
        return false;
    }
};

export const addExpense = async (expense) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/expenses`, expense);
        return response.data;
    } catch (error) {
        console.error("Error adding expense:", error);
        return null;
    }
};

export const getExpenses = async (filters) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/expenses`, { params: filters });
        return response.data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
    }
};
