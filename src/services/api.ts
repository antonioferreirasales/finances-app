import {
  storageAuthToken,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from '@/storage/storageAuthToken';
import { AppError } from '@/utils/AppError';
import { extractRefreshToken } from '@/utils/extractRefreshToken';
import axios, { InternalAxiosRequestConfig } from 'axios';
const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const api = axios.create({
  baseURL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (request) => {
    const token = await storageAuthTokenGet();
    request.headers.Authorization = `Bearer ${token.token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = (await storageAuthTokenGet()).refreshToken;
      const originalRequest = error.config as InternalAxiosRequestConfig;

      try {
        const response = await axios.patch(
          'token/refresh',
          { baseURL },
          { headers: { 'set-cookie': `refreshToken=${refreshToken}` } }
        );
        const { data, headers } = response;
        const token = data.token;
        if (token && headers['set-cookie']) {
          const refreshToken = extractRefreshToken(headers['set-cookie']);
          await storageAuthToken({ token, refreshToken });
        }

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        await storageAuthTokenRemove();
        throw error;
      }
    }
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(
        new AppError('Erro no servidor. Tente novamente mais tarde.')
      );
    }
  }
);
