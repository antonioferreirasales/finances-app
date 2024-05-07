import { Text } from 'react-native';
import { styled } from 'nativewind';
import { TextInput, TextInputProps } from 'react-native-paper';

interface FormInputProps extends TextInputProps {
  label: string;
  errorMessage?: string | null;
}

function FormInputStyled({
  errorMessage = null,
  textContentType,
  ...props
}: FormInputProps) {
  const isInvalid = !!errorMessage;
  return (
    <>
      <TextInput
        className=" border-white focus:border-green-500 rounded-md text-white bg-black"
        mode="outlined"
        error={errorMessage ? true : false}
        textColor="white"
        autoCapitalize={textContentType === 'name' ? 'words' : 'none'}
        {...props}
      />
      {isInvalid && <Text className="text-red-500">{errorMessage}</Text>}
    </>
  );
}

const FormInput = styled(FormInputStyled);
export { FormInput };
