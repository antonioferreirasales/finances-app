import { AppError } from '@/utils/AppError';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  responseType: 'json',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(
        new AppError('Erro no servidor. Tente novamente mais tarde.')
      );
    }
  }
);
