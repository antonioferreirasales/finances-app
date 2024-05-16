import { UserDTO } from '@/dtos/UserDTO';
import { ReactNode, createContext, useState } from 'react';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  function signIn(email: string, password: string) {}
  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
