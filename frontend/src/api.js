import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-manager-backend-1l6d.onrender.com/api',
});

export default api;