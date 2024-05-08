import { View, Text, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { Button } from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/FormInput';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@/routes/auth.routes';
import { useState } from 'react';
import { api } from '@/services/api';
import { AppError } from '@/utils/AppError';

type FormDataProps = {
  email: string;
  password: string;
};

const signUpSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Insira um e-mail'),
  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  const [loggedIn, setLogin] = useState<Boolean>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleLogin({ email, password }: FormDataProps) {
    try {
      const response = await api.post('/sessions', { email, password });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível logar. Tente novamente mais tarde.';
      title && Alert.alert(title);
    }
  }

  // function handleLogin({ email, password }: FormDataProps) {
  //   user_login({ email, password }).then((result) => {
  //     result?.status === 200 && setLogin(true);
  //   });
  // }

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
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Email"
              onChangeText={onChange}
              textContentType="emailAddress"
              inputMode="email"
              value={value}
              errorMessage={errors.email?.message}
              placeholder="Digite seu email"
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
              textContentType="password"
              secureTextEntry
              value={value}
              errorMessage={errors.password?.message}
              placeholder="Digita sua senha"
            />
          )}
        />

        <Text className="mt-2 text-white text-lg">
          Não está registrado?{' '}
          <Text className="font-bold underline" onPress={handleNewAccount}>
            Registre-se
          </Text>
        </Text>
      </View>
      <Button onPress={handleSubmit(handleLogin)} title="Login" />
      {loggedIn && (
        <Text className="text-green-600 text-sm">Logado com sucesso!</Text>
      )}
    </View>
  );
}
