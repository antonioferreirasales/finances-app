import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { Button } from '../components/Button';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/FormInput';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@/routes/auth.routes';
import { api } from '@/services/api';
import { AppError } from '@/utils/AppError';
import { ToggleProps } from './SignIn';
import { Snackbar } from 'react-native-paper';

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

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleLogin() {
    navigation.navigate('signIn');
  }

  const [isLoading, setIsLoading] = useState(false);
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

  async function handleRegister({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      const response = await api.post('/users', {
        name,
        email,
        password,
      });
      setRegistered(true);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível cadastrar o usuário. Tente novamente mais tarde.';
      setToggle({ message: title, isOn: true });
    } finally {
      setIsLoading(false);
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
              secureTextEntry
            />
          )}
        />

        <Text className="mt-2 text-white text-lg">
          Já tem uma conta?{' '}
          <Text className="font-bold underline" onPress={handleLogin}>
            Faça login
          </Text>
        </Text>
      </View>
      <Button loading={isLoading} onPress={handleSubmit(handleRegister)}>
        Registrar
      </Button>
      <Snackbar
        visible={toggle?.isOn}
        onDismiss={turnToggleOff}
        action={{
          label: 'Ok',
          onPress: turnToggleOff,
        }}
        style={{ backgroundColor: colors.red[400] }}
      >
        {toggle.message}
      </Snackbar>
      <Snackbar
        visible={registered}
        onDismiss={() => setRegistered(false)}
        style={{
          backgroundColor: colors.green[400],
        }}
      >
        Registrado com sucesso!
      </Snackbar>
    </View>
  );
}
