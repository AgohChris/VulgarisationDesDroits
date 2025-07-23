import axios from 'axios';

// Base URL de l'API
const API_BASE_URL = '@https://vulgarisationdesdroits-b02f.onrender.com/api';

// Création d'une instance Axios avec des paramètres par défaut
const axiosInstance = axios.create({ baseURL: API_BASE_URL });

// Exemple d'amélioration pour la gestion des erreurs
const handleError = (error, action) => {
  const message = error.response?.data?.message || error.message || `Erreur lors de ${action}`;
  console.error(message);
  throw new Error(message);
};

// Fonction pour lister toutes les ressources
export const getAllRessources = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/ressources/liste?page=${page}&limit=${limit}`);
    console.log('Données reçues :', response.data); // Debug
    return response.data;
  } catch (error) {
    handleError(error, "la récupération des ressources");
  }
};

// Fonction pour ajouter une ressource
export const createRessource = async (formData) => {
  try {
    const response = await axiosInstance.post('/ressources/ajouts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    handleError(error, "la création de la ressource");
  }
};


// Fonction pour modifier une ressource
export const updateRessource = async (id, ressourceData) => {
  try {
    const response = await axiosInstance.put(`/ressources/${id}/update`, {
      intitule: ressourceData.title,
      description: ressourceData.description,
      type: ressourceData.type,
      upload: ressourceData.upload || null,
      lien: ressourceData.link || null,
    });
    return response.data;
  } catch (error) {
    handleError(error, "la modification de la ressource");
  }
};

// Fonction pour supprimer une ressource
export const deleteRessource = async (id) => {
  try {
    const response = await axiosInstance.delete(`/ressources/${id}/delete`);
    return response.data;
  } catch (error) {
    handleError(error, "la suppression de la ressource");
  }
};

// Fonction pour compter les ressources
export const fetchCountRessources = async () => {
  try {
    const response = await axiosInstance.get('/ressources/count');
    return response.data.count_ressource;
  } catch (error) {
    console.error('Erreur lors du comptage des ressources :', error);
    throw error;
  }
};

// Fonction pour lister les ressources par type
export const getRessourcesByType = async (type) => {
  try {
    const response = await axiosInstance.get(`/ressources/liste/type/${type}`);
    return response.data;
  } catch (error) {
    handleError(error, `la récupération des ressources de type ${type}`);
  }
};