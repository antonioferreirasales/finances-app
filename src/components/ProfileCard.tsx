import { Card, CardHeader, CardContent } from './Card';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { Avatar } from 'react-native-paper';
const StyledView = styled(View);
const StyledText = styled(Text);
import { completaUserData } from '@/contexts/AuthContext';

interface ProfileCardProps {
  userData: completaUserData;
}

export function ProfileCard({ userData }: ProfileCardProps) {
  return (
    <StyledView className="bg-gray-100 dark:bg-gray-900 h-screen flex items-center justify-center">
      {/* <StyledView className="bg-gray-900 dark:bg-gray-800 text-white py-2 px-4 flex items-center justify-between">
        <StyledText className="text-sm font-medium">
          Logged in as john@example.com
        </StyledText>
        <CardButton title="Log out">
          <AntDesign
            name="logout"
            size={24}
            color="black"
            onPress={() => {
              console.log('hello');
            }}
          />
          <StyledText className="sr-only">Logout</StyledText>
        </CardButton>
      </StyledView> */}
      <StyledView className="flex items-center justify-center flex-1"></StyledView>
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gray-100 dark:bg-gray-900 px-6 py-8 flex flex-col items-center">
          <Avatar.Image source={require('@/../assets/niffler-icon.png')} />
          <StyledView className="text-center items-center">
            <StyledText className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
              {userData.name}
            </StyledText>
            <StyledText className="text-gray-500 dark:text-gray-400 text-sm">
              {userData.email}
            </StyledText>
          </StyledView>
        </CardHeader>
        <CardContent className="px-6 py-8 space-y-4">
          <StyledView className="flex items-center justify-between">
            <StyledText className="text-gray-500 dark:text-gray-400 text-sm">
              Criação da conta
            </StyledText>
            <StyledText className="text-gray-900 dark:text-gray-50 text-sm font-medium">
              10 de Junho, 2024
            </StyledText>
          </StyledView>
          {/* <Separator className="bg-gray-200 dark:bg-gray-700" /> */}
          <StyledView className="flex items-center justify-between">
            <StyledText className="text-gray-500 dark:text-gray-400 text-sm">
              Tipo de usuário
            </StyledText>
            <StyledText className="text-gray-900 dark:text-gray-50 text-sm font-medium">
              {userData.role === 'ADMIN' ? 'Administrador' : 'Usuário comum'}
            </StyledText>
          </StyledView>
          {/* <Separator className="bg-gray-200 dark:bg-gray-700" /> */}
          <StyledView className="flex items-center justify-between">
            <StyledText className="text-gray-500 dark:text-gray-400 text-sm">
              Followers
            </StyledText>
            <StyledText className="text-gray-900 dark:text-gray-50 text-sm font-medium">
              1,234
            </StyledText>
          </StyledView>
          {/* <Separator className="bg-gray-200 dark:bg-gray-700" /> */}
          <StyledView className="flex items-center justify-between">
            <StyledText className="text-gray-500 dark:text-gray-400 text-sm">
              Following
            </StyledText>
            <StyledText className="text-gray-900 dark:text-gray-50 text-sm font-medium">
              567
            </StyledText>
          </StyledView>
        </CardContent>
      </Card>
    </StyledView>
  );
}
