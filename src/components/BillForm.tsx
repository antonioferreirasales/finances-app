import { styled } from 'nativewind';
import colors from 'tailwindcss/colors';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TypeFormProps } from './TypeForms';

const data = [
  { label: 'Cobrança', value: '1' },
  { label: 'Imprevisto', value: '2' },
  { label: 'Salário', value: '3' },
  { label: 'Outros', value: '4' },
];

function Form({ ...props }) {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  function renderLabel() {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: colors.purple[600] }]}>
          Tipo de conta
        </Text>
      );
    }
    return null;
  }

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.green[400] }]}
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
            name="questioncircle"
            size={20}
          />
        )}
      />
      {value.length != 0 && <TypeFormProps id={value} />}
    </View>
  );
}

export const BillForm = styled(Form);

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple[400],
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.purple[400],
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
