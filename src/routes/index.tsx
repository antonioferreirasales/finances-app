import { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthContext } from '@/contexts/AuthContext';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { View } from 'react-native';

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = 'black';

  const contextData = useContext(AuthContext);
  console.log('Usuário logado ->', contextData);
  return (
    <View className="flex-1 bg-black">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </View>
  );
}
