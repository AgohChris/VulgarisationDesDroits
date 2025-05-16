import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchChatSessions = async () => {
  const response = await api.get('/chats/liste/');
  return response.data;
};