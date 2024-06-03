import { Button, Text } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BillForm } from '@/components/BillForm';
import colors from 'tailwindcss/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '@/hooks/useAuth';

export function Home() {
  const { userData, signOut } = useAuth();
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleClosePress() {
    bottomSheetRef.current?.close();
  }

  function handleOpenPress() {
    bottomSheetRef.current?.expand();
  }

  return (
    <>
      <SafeAreaView>
        <View className="flex-row justify-between items-center bg-green-400 p-3 border-2">
          <Text className="text-black">Seja bem vindo, {userData.name}</Text>
          <AntDesign name="logout" size={24} color="black" onPress={signOut} />
        </View>
        <View className="items-center">
          <Text className="text-green-400 py-1">
            Clique aqui para adicionar uma conta
          </Text>
          <Button mode="contained" onPress={handleOpenPress}>
            Adicionar
          </Button>
        </View>
        <View></View>
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.purple[400] }}
        handleIndicatorStyle={{ backgroundColor: colors.green[400] }}
      >
        <BillForm />
      </BottomSheet>
    </>
  );
}
