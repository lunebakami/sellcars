import axios from 'axios';

const api = axios.create({
  baseURL: process.env.CAR_API_URL,
});

export default api;
