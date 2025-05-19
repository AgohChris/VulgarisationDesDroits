import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api', // Assurez-vous que l'URL est correcte
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;