import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styled } from 'nativewind';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

function ButtonStyled({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-14 w-full mt-8 bg-violet-400 rounded-md items-center justify-center"
      {...props}
    >
      <Text className="text-white font-bold text-xl">{title}</Text>
    </TouchableOpacity>
  );
}

const Button = styled(ButtonStyled);
export { Button };
