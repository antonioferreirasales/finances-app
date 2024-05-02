import axios from 'axios';

export const APIManager = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  responseType: 'json',
  withCredentials: true,
});
