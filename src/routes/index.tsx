import { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { useAuth } from '@/hooks/useAuth';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { View } from 'react-native';

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = 'black';

  const { user } = useAuth();
  console.log('Usuário logado ->', user);
  return (
    <View className="flex-1 bg-black">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </View>
  );
}
