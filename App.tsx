import { StatusBar } from 'react-native';
import { Routes } from '@/routes';
import { PaperProvider } from 'react-native-paper';
import { AuthContextProvider } from '@/contexts/AuthContext';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </PaperProvider>
  );
}
