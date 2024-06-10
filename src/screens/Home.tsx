import { Button, Text } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { BillForm } from '@/components/BillForm';
import colors from 'tailwindcss/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chart } from '@/components/Chart';
import { HomeCard } from '@/components/HomeCard';
import { completaUserData } from '@/contexts/AuthContext';

export function Home() {
  const { signOut, getUserData } = useAuth();
  const [userData, setUserData] = useState<completaUserData>();

  async function handlerUserData() {
    try {
      const data = await getUserData();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handlerUserData();
  }, []);
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
            Seja bem vindo, {userData?.name} ✋
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
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.purple[100] }}
        handleIndicatorStyle={{ backgroundColor: colors.black }}
      >
        <BillForm />
      </BottomSheet>
    </>
  );
}
