import { Text, TextInput, TextInputProps } from 'react-native';
import { styled } from 'nativewind';
import { clsx } from 'clsx';

interface FormInputProps extends TextInputProps {
  label: string;
  errorMessage?: string | null;
}

function FormInputStyled({
  label,
  errorMessage = null,
  ...props
}: FormInputProps) {
  const isInvalid = !!errorMessage;
  return (
    <>
      <Text className="text-white text-sm">{label}</Text>
      <TextInput
        className={clsx(
          '(w-full h-14 mb-3 border-white focus:border-green-500 border-2 rounded-md px-4 text-white )',
          { 'border-red-500 focus:border-red-500': isInvalid }
        )}
        {...props}
      />
      {isInvalid && <Text className="text-red-500">{errorMessage}</Text>}
    </>
  );
}

const FormInput = styled(FormInputStyled);
export { FormInput };
