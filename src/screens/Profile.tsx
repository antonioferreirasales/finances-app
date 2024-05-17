import { useAuth } from '@/hooks/useAuth';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

export function Profile() {
  const { userData } = useAuth();
  return (
    <View className="flex-1 bg-purple-400">
      <View className="pt-8 pb-8 flex-row justify-around bg-black rounded-md">
        <Text className="mt-5 text-gray-200 text-lg">Informação de perfil</Text>
        <Avatar.Image source={require('../../assets/niffler-icon.png')} />
      </View>

      <Text className="m-auto text-green-600 text-lg">Profile</Text>
    </View>
  );
}
