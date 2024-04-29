import { View, Text, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { Button } from '../components/Button';
import { useState } from 'react';
import { user_register } from '@/api/user_api';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleRegister() {
    user_register({
      name,
      email,
      password,
    }).then((result) => {
      result && setMessage(result.status.toString());
    });
  }

  return (
    <View className="flex-1 bg-black items-center justify-center p-8">
      <MaterialCommunityIcons
        name="home-roof"
        size={34}
        color={colors.green[500]}
      />
      <Text className="text-white text-2xl font-bold my-4">Niffler</Text>
      <View className="w-full">
        <Text className="text-white text-sm">Nome</Text>
        <TextInput
          className="w-full h-14 mb-3 border-white border-2 rounded-md text-white px-4 focus:border-green-500"
          textContentType="name"
          onChangeText={(name) => setName(name)}
        />
        <Text className="text-white text-sm">Email</Text>
        <TextInput
          className="w-full h-14 mb-3 border-white border-2 rounded-md text-white px-4 focus:border-green-500"
          inputMode="email"
          textContentType="emailAddress"
          onChangeText={(email) => setEmail(email)}
        />
        <Text className="text-white text-sm">Senha</Text>
        <TextInput
          className="w-full h-14 border-white border-2 rounded-md text-white px-4 focus:border-green-500"
          textContentType="newPassword"
          onChangeText={(password) => setPassword(password)}
        />
        <Text className="mt-2 text-white text-lg">
          Já tem uma conta?{' '}
          <Text className="font-bold underline">Faça login</Text>
        </Text>
      </View>
      <Button
        register={handleRegister}
        className="w-full mt-8 bg-violet-400"
        title="Registrar"
      />
      <Text className="text-red-600 text-sm">Mensagem: {message}</Text>
    </View>
  );
}
