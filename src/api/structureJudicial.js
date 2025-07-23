import axios from 'axios';

const API_BASE_URL = '@https://vulgarisationdesdroits-vleq.onrender.com/api/structure-judiciaire'; // Remplacez par l'URL de votre backend Laravel

export const fetchStructures = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/liste`);
    return response.data.data; // Retourne uniquement les données
  } catch (error) {
    console.error("Erreur lors de la récupération des structures judiciaires :", error);
    throw error;
  }
};

export const addStructure = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ajout`, data); // data inclut 'nom', 'description', et 'exemple'
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
    throw error;
  }
};

export const updateStructure = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, data); // data inclut 'nom', 'description', et 'exemple'
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error.response?.data || error.message);
    throw error;
  }
};

export const deleteStructure = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/supprimer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error.response?.data || error.message);
    throw error;
  }
};

export const fetchJudicialSystemCount = async () => {
  try {
    const response = await axios.get(`@https://vulgarisationdesdroits-vleq.onrender.com/api/structure-judiciaire/count`);
    return response.data.total; // Retourne uniquement le nombre
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de structures judiciaires :", error);
    throw error;
  }
};