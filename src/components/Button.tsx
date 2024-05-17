import { Button, ButtonProps } from 'react-native-paper';
import { styled } from 'nativewind';
import colors from 'tailwindcss/colors';

function ButtonType({ ...props }: ButtonProps) {
  return (
    <Button
      className="mt-4"
      mode="contained"
      contentStyle={{
        paddingHorizontal: 64,
        paddingVertical: 8,
        backgroundColor: colors.green[400],
      }}
      textColor="black"
      {...props}
    ></Button>
  );
}

const StyledButton = styled(ButtonType);
export { StyledButton as Button };
