import { Button, Text } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import { View } from 'react-native';
import { BillForm } from '@/components/BillForm';
import colors from 'tailwindcss/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chart } from '@/components/Chart';
import { HomeCard } from '@/components/HomeCard';

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
        <View className="flex-row justify-between items-center bg-white p-3 rounded-b-md">
          <Text className="text-gray-950 font-semibold">
            Seja bem vindo, {userData.name} ✋
          </Text>
          <AntDesign name="logout" size={24} color="black" onPress={signOut} />
        </View>
        <View>
          <Chart />
        </View>
        <HomeCard handleNewBillButton={handleOpenPress} />
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        index={2}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.purple[300] }}
        handleIndicatorStyle={{ backgroundColor: colors.green[400] }}
      >
        <BillForm />
      </BottomSheet>
    </>
  );
}
