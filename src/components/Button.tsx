import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

interface ButtonProps {
  title: string;
  register: () => void;
}

function ButtonStyled({ title, register, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-14 bg-green-400 rounded-md items-center justify-center"
      onPress={register}
      {...props}
    >
      <Text className="text-white font-bold text-xl">{title}</Text>
    </TouchableOpacity>
  );
}

const Button = styled(ButtonStyled);
export { Button };
