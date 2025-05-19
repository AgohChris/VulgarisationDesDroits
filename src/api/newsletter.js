import api from './api';

// Récupérer les abonnés actifs
export const fetchSubscribers = async () => {
  try {
    const response = await api.get('/newsletter/abonnee');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnés :", error.response?.data || error.message);
    throw error;
  }
};

// Ajouter un abonné
export const addSubscriber = async (email) => {
  try {
    const response = await api.post('/newsletter/abonnee', { email });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un abonné :", error.response?.data || error.message);
    throw error;
  }
};
