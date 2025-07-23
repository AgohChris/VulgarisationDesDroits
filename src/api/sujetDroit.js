import axios from 'axios';

const API_BASE_URL = 'https://vulgarisationdesdroits-vleq.onrender.com/api/sujet-droit';

export const fetchSubjects = async () => {
  try {
    const response = await axios.get('https://vulgarisationdesdroits-vleq.onrender.com/api/sujet-droit/liste');
    return response.data.data; // Assurez-vous que l'API retourne les sujets dans `data`
  } catch (error) {
    console.error("Erreur lors de la récupération des sujets :", error);
    throw error;
  }
};

export const addSubject = async (data) => {
  try {
    const response = await axios.post('https://vulgarisationdesdroits-vleq.onrender.com/api/sujet-droit/ajout', data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du sujet :", error.response?.data || error.message);
    throw error;
  }
};

export const updateSubject = async (id, data) => {
  try {
    const response = await axios.put(`https://vulgarisationdesdroits-vleq.onrender.com/api/sujet-droit/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du sujet :", error.response?.data || error.message);
    throw error;
  }
};

export const deleteSubject = async (id) => {
  try {
    const response = await axios.delete(`https://vulgarisationdesdroits-vleq.onrender.com/api/sujet-droit/supprimer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du sujet :", error.response?.data || error.message);
    throw error;
  }
};

export const fetchSubjectCount = async () => {
  try {
    const response = await axios.get('https://vulgarisationdesdroits-vleq.onrender.com/api/sujet-droit/count');
    return response.data.total; // Retourne le total des sujets
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de sujets :", error);
    throw error;
  }
};