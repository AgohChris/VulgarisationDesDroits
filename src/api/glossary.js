import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Remplacez par l'URL de votre backend Laravel

export const fetchGlossaries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/liste/glossaire`);
    return response.data.data; // Retourne uniquement les données
  } catch (error) {
    console.error("Erreur lors de la récupération des glossaires :", error);
    throw error;
  }
};

export const addGlossary = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/glossaire`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
    throw error;
  }
};

export const updateGlossary = async (id, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/glossaire/modifier/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification :", error.response?.data || error.message);
    throw error;
  }
};

export const deleteGlossary = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/glossaire/supprimer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error.response?.data || error.message);
    throw error;
  }
};

const loadGlossaries = async () => {
  try {
    const data = await fetchGlossaries();
    if (Array.isArray(data)) {
      setGlossaryItems(data);
    } else {
      console.error("Données inattendues :", data);
    }
  } catch (error) {
    console.error("Erreur lors du chargement des glossaires :", error);
    toast({
      title: "Erreur",
      description: "Impossible de charger les glossaires. Veuillez réessayer.",
      variant: "destructive",
    });
  }
};