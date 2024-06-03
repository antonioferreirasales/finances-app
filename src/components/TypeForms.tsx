import { Text, ButtonProps, TextInput, Button } from 'react-native-paper';
import { styled } from 'nativewind';
import colors from 'tailwindcss/colors';
import { View } from 'react-native';
import { useState } from 'react';
import { styles } from './BillForm';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

interface TypeFormProps {
  id: string;
}

function Form({ id, ...props }: TypeFormProps) {
  if (id === '1') {
    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const data = [
      { label: 'Baixa', value: '1' },
      { label: 'Média', value: '2' },
      { label: 'Alta', value: '3' },
    ];

    function renderLabel() {
      if (value || isFocus) {
        return (
          <Text
            style={[styles.label, isFocus && { color: colors.purple[600] }]}
          >
            Urgência
          </Text>
        );
      }
      return null;
    }

    return (
      <>
        <View className="px-4">
          <TextInput
            label={'Valor'}
            style={{ backgroundColor: colors.purple[400] }}
            placeholderTextColor="white"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.container}>
          {renderLabel()}
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: colors.green[400] },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecione um tipo' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? colors.purple[600] : 'black'}
                name="minuscircleo"
                size={20}
              />
            )}
          />
          <Button className="mt-1 py-1" mode="contained">
            Criar
          </Button>
        </View>
      </>
    );
  }

  return (
    <View>
      <Text>No ID provided!</Text>
    </View>
  );
}

export const TypeFormProps = styled(Form);
