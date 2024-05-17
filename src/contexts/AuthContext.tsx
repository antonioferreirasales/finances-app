import { TokenDTO } from '@/dtos/TokenDTO';
import { api } from '@/services/api';
import {
  storageAuthToken,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from '@/storage/storageAuthToken';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { extractRefreshToken } from '@/utils/extractRefreshToken';
import { UserDTO } from '@/dtos/UserDTO';

export type AuthContextDataProps = {
  userData: UserDTO;
  token: TokenDTO;
  signIn: (email: string, password: string) => Promise<void>;
  // getUserData: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userToken, setUserToken] = useState<TokenDTO>({} as TokenDTO);
  const [userData, setUserData] = useState<UserDTO>({} as UserDTO);

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

  async function getUserData() {
    try {
      const { data } = await api.get('/me');
      console.log(data);
      setUserData(data.user);
    } catch (error) {
      throw error;
    }
  }

  // load user data at app start
  useEffect(() => {
    loadTokenData();
    getUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, token: userToken, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
