import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/ressources';

export const fetchResources = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/liste`);
    return response.data.data; // Retourne la liste des ressources
  } catch (error) {
    console.error("Erreur lors de la récupération des ressources :", error);
    throw error;
  }
};

export const addResource = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ajout`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la ressource :", error.response?.data || error.message);
    throw error;
  }
};

export const updateResource = async (id, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/modifier/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la ressource :", error.response?.data || error.message);
    throw error;
  }
};

export const deleteResource = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/supprimer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la ressource :", error.response?.data || error.message);
    throw error;
  }
};

export const fetchResourceCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/count`);
    return response.data.total; // Retourne le nombre total de ressources
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de ressources :", error);
    throw error;
  }
};