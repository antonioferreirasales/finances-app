import { View } from 'react-native';
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
import { AppError } from '@/utils/AppError';
import { Snackbar, Text } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';

type FormDataProps = {
  email: string;
  password: string;
};

type ToggleProps = {
  message: string;
  isOn: boolean;
};

const signUpSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Insira um e-mail'),
  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});

export function SignIn() {
  const { user, signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  const [loggedIn, setLogin] = useState<Boolean>();
  const [toggle, setToggle] = useState<ToggleProps>({
    message: '',
    isOn: false,
  });

  function turnToggleOff() {
    setToggle((prevState) => ({
      ...prevState,
      isOn: false,
    }));
  }

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
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível logar. Tente novamente mais tarde.';
      setToggle({ message: title, isOn: true });
    }
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
          <Text
            className="font-bold text-white underline"
            onPress={handleNewAccount}
          >
            Registre-se
          </Text>
        </Text>
      </View>
      <Button onPress={handleSubmit(handleLogin)} title="Login" />
      {loggedIn && (
        <Text className="text-green-600 text-sm">Logado com sucesso!</Text>
      )}
      <Snackbar
        visible={toggle?.isOn}
        onDismiss={turnToggleOff}
        action={{
          label: 'Ok',
          onPress: turnToggleOff,
        }}
      >
        {toggle.message}
      </Snackbar>
      <Text className="pt-4 text-red-700 text-2xl">{JSON.stringify(user)}</Text>
    </View>
  );
}
