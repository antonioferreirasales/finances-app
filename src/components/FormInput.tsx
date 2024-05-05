import { Text, TextInput, TextInputProps } from 'react-native';
import { styled } from 'nativewind';

interface FormInputProps extends TextInputProps {
  label: string;
  errorMessage?: string | null;
}

function FormInputStyled({
  label,
  errorMessage = null,
  ...props
}: FormInputProps) {
  return (
    <>
      <Text className="text-white text-sm">{label}</Text>
      <TextInput
        className="w-full h-14 mb-3 border-white border-2 rounded-md text-white px-4 focus:border-green-500"
        {...props}
      />
      <Text className="text-red-500">{errorMessage}</Text>
    </>
  );
}

const FormInput = styled(FormInputStyled);
export { FormInput };
