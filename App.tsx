import { Text, View, StatusBar } from 'react-native';
import { Routes } from '@/routes';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </PaperProvider>
  );
}
