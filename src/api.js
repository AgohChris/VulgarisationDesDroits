import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vulgarisationdesdroits-b02f.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchChatSessions = async () => {
  const response = await api.get('/chats/liste/');
  return response.data;
};