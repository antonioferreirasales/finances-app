import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { View } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = 'black';

  return (
    <View className="flex-1 bg-black">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </View>
  );
}
