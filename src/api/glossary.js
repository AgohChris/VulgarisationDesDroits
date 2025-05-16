import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Remplacez par l'URL de votre backend Laravel

export const fetchGlossaries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/glossaire`);
    console.log("Données récupérées :", response.data); // Vérifiez les données ici
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération :", error.response?.data || error.message);
    throw error;
  }
};

export const addGlossary = async (data) => {
  try {
    console.log("Données envoyées :", data); // Vérifiez les données ici
    const response = await axios.post(`${API_BASE_URL}/glossaire`, data);
    console.log("Réponse du backend :", response.data); // Vérifiez la réponse ici
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
    throw error;
  }
};

export const updateGlossary = async (id, data) => {
  const response = await axios.post(`${API_BASE_URL}/glossaire/modifier/${id}`, data);
  return response.data;
};

export const deleteGlossary = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/glossaire/supprimer/${id}`);
  return response.data;
};