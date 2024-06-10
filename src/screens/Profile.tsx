import { ProfileCard } from '@/components/ui/ProfileCard';
import { completaUserData } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export function Profile() {
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState<completaUserData>();

  async function handlerUserData() {
    try {
      const data = await getUserData();
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handlerUserData();
  }, []);
  return (
    <View className="flex-1 bg-purple-400">
      {userData ? <ProfileCard userData={userData} /> : <Text>No data</Text>}
    </View>
  );
}
