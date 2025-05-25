import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/categorie-droit';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/liste`);
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    throw error;
  }
};

export const addCategory = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ajout`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie :", error.response?.data || error.message);
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie :", error.response?.data || error.message);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/supprimer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error.response?.data || error.message);
    throw error;
  }
};

export const fetchCategoryCount = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categorie-droit/count');
    return response.data.total; // Retourne le total des catégories
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de catégories :", error);
    throw error;
  }
};