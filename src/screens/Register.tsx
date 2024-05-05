import { View, Text, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { Button } from '../components/Button';
import { useState } from 'react';
import { user_register } from '@/api/user_api';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/FormInput';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
};

const signUpSchema = z.object({
  name: z.string().min(3, 'O nome precisa ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido').min(1, 'Insira um e-mail'),
  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});

export function Register() {
  const [registered, setRegistered] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

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
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Nome"
              onChangeText={onChange}
              textContentType="name"
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Email"
              onChangeText={onChange}
              textContentType="emailAddress"
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Senha"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
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
