import { TokenDTO } from '@/dtos/TokenDTO';
import { api } from '@/services/api';
import {
  storageAuthToken,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from '@/storage/storageAuthToken';
import { ReactNode, createContext, useEffect, useState } from 'react';

export type AuthContextDataProps = {
  token: TokenDTO;
  signIn: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userToken, setUserToken] = useState<TokenDTO>({} as TokenDTO);

  async function signIn(email: string, password: string) {
    try {
      const { token }: TokenDTO = await api.post('/sessions', {
        email,
        password,
      });
      if (token) {
        console.log(token);
        setUserToken({ token });
        storageAuthToken({ token });
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    const userLogged = await storageAuthTokenGet();

    if (userLogged) {
      setUserToken(userLogged);
    }
  }

  async function signOut() {
    try {
      setUserToken({} as TokenDTO);
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ token: userToken, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
