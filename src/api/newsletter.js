import api from './api';

// Récupérer la liste des abonnés
export const fetchSubscribers = async () => {
  try {
    const response = await api.get('/newsletter/abonnee/liste');
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


// Récupérer toutes les newsletters
export const fetchNewsletters = async () => {
  try {
    const response = await api.get('/newsletter/messages/liste/');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des newsletters :", error.response?.data || error.message);
    throw error;
  }
};

// Créer une nouvelle newsletter
export const createNewsletter = async (data) => {
  try {
    const response = await api.post('/newsletter/messages/create', data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la newsletter :", error.response?.data || error.message);
    throw error;
  }
};

// Mettre à jour une newsletter
export const updateNewsletter = async (id, data) => {
  try {
    const response = await api.put(`/newsletter/messages/${id}/update`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la newsletter :", error.response?.data || error.message);
    throw error;
  }
};

// Supprimer une newsletter
export const deleteNewsletter = async (id) => {
  try {
    const response = await api.delete(`/newsletter/messages/${id}/suppression`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la newsletter :", error.response?.data || error.message);
    throw error;
  }
};

// Envoyer une newsletter
export const sendNewsletter = async (id) => {
  try {
    const response = await api.post(`/newsletter/messages/${id}/send/`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la newsletter :", error.response?.data || error.message);
    throw error;
  }
};
