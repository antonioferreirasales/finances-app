import { TokenDTO } from '@/dtos/TokenDTO';
import { api } from '@/services/api';
import {
  storageAuthToken,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from '@/storage/storageAuthToken';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { extractRefreshToken } from '@/utils/extractRefreshToken';

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
      const { data, headers } = await api.post('/sessions', {
        email,
        password,
      });
      if (data) {
        // updates the refreshToken if there is one in the header
        if (headers['set-cookie']) {
          const refreshToken = extractRefreshToken(headers['set-cookie']);
          setUserToken((prevState) => ({ ...prevState, refreshToken }));
        }

        setUserToken((prevState) => ({ ...prevState, token: data.token }));
        storageAuthToken({
          token: data.token,
          refreshToken: userToken.refreshToken,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadTokenData() {
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

  // load user data at app start
  useEffect(() => {
    loadTokenData();
  }, []);

  return (
    <AuthContext.Provider value={{ token: userToken, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
