import axios from 'axios';

export const APIManager = axios.create({
  baseURL: process.env.BASE_URL,
  responseType: 'json',
  withCredentials: true,
});
