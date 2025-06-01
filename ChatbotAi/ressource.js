import axios from 'axios';

// Base URL de l'API
const API_BASE_URL = 'http://127.0.0.1:8080';

// Fonction pour lister toutes les ressources
export const getAllRessources = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ressources/liste`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources :', error);
    throw error;
  }
};

// Fonction pour ajouter une ressource
export const createRessource = async (ressourceData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ressources/ajouts`, ressourceData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la ressource :', error);
    throw error;
  }
};

// Fonction pour modifier une ressource
export const updateRessource = async (id, ressourceData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/ressources/${id}/update`, ressourceData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification de la ressource :', error);
    throw error;
  }
};

// Fonction pour supprimer une ressource
export const deleteRessource = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/ressources/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la ressource :', error);
    throw error;
  }
};

// Fonction pour compter les ressources
export const countRessources = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ressources/count`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du comptage des ressources :', error);
    throw error;
  }
};

// Fonction pour lister les ressources par type
export const getRessourcesByType = async (type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ressources/liste/type/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des ressources de type ${type} :`, error);
    throw error;
  }
};