import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-manager-backend.onrender.com/api',
});

export default api;