import { View, Text, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { Button } from '../components/Button';
import { useState } from 'react';
import { user_register } from '@/api/user_api';
import { useForm, Controller } from 'react-hook-form';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
};

export function Register() {
  const [registered, setRegistered] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  function handleRegister({ name, email, password }: FormDataProps) {
    user_register({
      name,
      email,
      password,
    }).then((result) => {
      result?.status === 201 && setRegistered(true);
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
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Informe o nome',
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-full h-14 mb-3 border-white border-2 rounded-md text-white px-4 focus:border-green-500"
              textContentType="name"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Text className="text-white">{errors.name?.message}</Text>

        <Text className="text-white text-sm">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-full h-14 mb-3 border-white border-2 rounded-md text-white px-4 focus:border-green-500"
              inputMode="email"
              textContentType="emailAddress"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Text className="text-white text-sm">Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-full h-14 border-white border-2 rounded-md text-white px-4 focus:border-green-500"
              textContentType="newPassword"
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleRegister)}
              returnKeyType="send"
            />
          )}
        />

        <Text className="mt-2 text-white text-lg">
          Já tem uma conta?{' '}
          <Text className="font-bold underline">Faça login</Text>
        </Text>
      </View>
      <Button
        register={handleSubmit(handleRegister)}
        className="w-full mt-8 bg-violet-400"
        title="Registrar"
      />
      {registered && (
        <Text className="text-green-600 text-sm">Registrado com sucesso!</Text>
      )}
    </View>
  );
}
