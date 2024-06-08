import { styled } from 'nativewind';
import colors from 'tailwindcss/colors';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { createBill } from '@/services/http/bills';

interface TypeFormProps {
  id: string;
}

function TypeForm({ id, ...props }: TypeFormProps) {
  if (id === '1') {
    function showValues() {
      console.log(
        `The TypeForm is ${id}, urgency value is ${urgencyValue}, the number value is ${value} and the date is ${date}`
      );
    }
    const [urgencyValue, setUrgencyValue] = useState('');
    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const data = [
      { label: 'Baixa', value: '1' },
      { label: 'Média', value: '2' },
      { label: 'Alta', value: '3' },
    ];

    function handleCreateButton() {
      createBill({
        billTypeID: 1,
        total_value: value,
        urgency: 'Baixa',
        is_active: true,
        is_recurring: checked,
        due_date: date,
      });
    }

    function renderLabel() {
      if (urgencyValue || isFocus) {
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
            value={value}
            onChangeText={setValue}
            style={{ backgroundColor: colors.purple[300] }}
            placeholderTextColor="white"
            keyboardType="number-pad"
            textColor={colors.gray[900]}
            right={<TextInput.Icon icon="cash-multiple" />}
          />
        </View>
        {/* urgency */}
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
            containerStyle={{ backgroundColor: colors.green[300] }}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecione um tipo' : '...'}
            searchPlaceholder="Search..."
            value={urgencyValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setUrgencyValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? colors.green[500] : colors.gray[900]}
                name="warning"
                size={20}
              />
            )}
          />
          <View className="flex-row items-center">
            <Text>Recorrente?</Text>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>
          <Button onPress={() => setOpen(true)}>
            Data de vencimento: {date.toString()}
          </Button>
          <DatePicker
            modal
            open={open}
            date={date}
            locale="pt-br"
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Button
            className="mt-1 py-1"
            onPress={handleCreateButton}
            mode="contained"
          >
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
        <Text style={[styles.label, isFocus && { color: colors.green[600] }]}>
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
        style={[styles.dropdown, isFocus && { borderColor: colors.green[200] }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{ backgroundColor: colors.green[200] }}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Selecione o nível de urgência' : '...'}
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
            color={isFocus ? colors.green[400] : 'black'}
            name="form"
            size={20}
          />
        )}
      />
      {value.length != 0 && <TypeForm id={value} />}
    </View>
  );
}

export const BillForm = styled(Form);

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple[300],
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
    backgroundColor: colors.purple[300],
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
