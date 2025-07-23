import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vulgarisationdesdroits-b02f.onrender.com/api', // Assurez-vous que l'URL est correcte
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;