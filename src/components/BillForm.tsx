import { styled } from 'nativewind';
import colors from 'tailwindcss/colors';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { createBill, createBillProps } from '@/services/http/bills';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
interface TypeFormProps {
  id: string;
  setBillTypeID: (id: string) => void;
}

function TypeForm({ id, setBillTypeID }: TypeFormProps) {
  if (id === '1' || id === '2' || id === '3' || id === '4') {
    const [urgencyValue, setUrgencyValue] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [netValue, setNetValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const data = [
      { label: 'Baixa', value: '1' },
      { label: 'Média', value: '2' },
      { label: 'Alta', value: '3' },
    ];

    const urgencyMap: { [key: string]: 'Baixa' | 'Média' | 'Alta' } = {
      '1': 'Baixa',
      '2': 'Média',
      '3': 'Alta',
    };

    function clear() {
      setBillTypeID('');
      setUrgencyValue('');
      setDescription('');
      setValue('');
      setNetValue('');
      setIsFocus(false);
      setChecked(false);
      setDate(new Date());
    }

    function handleCreateButton() {
      setIsLoading(true);
      try {
        const IDType = Number(id);
        const billData: createBillProps = {
          billTypeID: IDType,
          total_value: value,
          urgency: urgencyMap[urgencyValue],
          is_recurring: checked,
          due_date: date,
          description: description,
        };

        if (IDType === 3) {
          billData.net_value = netValue;
          billData.is_recurring = true;
          billData.urgency = 'Baixa';
        }

        createBill(billData);
        clear();
      } finally {
        setIsLoading(false);
      }
    }

    function renderLabel() {
      if (urgencyValue || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: colors.gray[500] }]}>
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
            label={'Descrição'}
            value={description}
            onChangeText={setDescription}
            style={{ backgroundColor: colors.purple[300] }}
            placeholderTextColor="white"
            keyboardType="default"
            autoCapitalize="sentences"
            textColor={colors.gray[900]}
            right={
              <TextInput.Icon
                icon="note-text-outline"
                color={colors.green[900]}
              />
            }
          />
        </View>
        <View className="px-4">
          <TextInput
            label={'Valor'}
            value={value}
            onChangeText={setValue}
            style={{ backgroundColor: colors.purple[300] }}
            placeholderTextColor="white"
            keyboardType="number-pad"
            textColor={colors.gray[900]}
            right={
              <TextInput.Icon icon="cash-multiple" color={colors.green[900]} />
            }
          />
          {id === '3' && (
            <TextInput
              label={'Valor líquido'}
              value={netValue}
              onChangeText={setNetValue}
              style={{ backgroundColor: colors.purple[300] }}
              placeholderTextColor="white"
              keyboardType="number-pad"
              textColor={colors.gray[900]}
              right={
                <TextInput.Icon
                  icon="cash-multiple"
                  color={colors.green[800]}
                />
              }
            />
          )}
        </View>
        {/* urgency */}
        <View style={styles.container}>
          {id != '3' && (
            <>
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
                placeholder={!isFocus ? 'Selecione o nível de urgência' : '...'}
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
                    color={isFocus ? colors.gray[500] : colors.gray[900]}
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
                Data de vencimento:{' '}
                {format(date, 'dd/MM/yyyy', { locale: ptBR })}
              </Button>
              <DatePicker
                mode="date"
                title={'Seleciona a data de vencimento'}
                confirmText="Confirmar"
                cancelText="Cancelar"
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
            </>
          )}
          <Button
            className="mt-1 py-1"
            onPress={handleCreateButton}
            mode="contained"
            loading={isLoading}
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
  function setBillTypeID(id: string) {
    setValue(id);
  }

  function renderLabel() {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: colors.gray[500] }]}>
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
            color={isFocus ? colors.gray[500] : colors.gray[900]}
            name="form"
            size={20}
          />
        )}
      />
      {value.length != 0 && (
        <TypeForm id={value} setBillTypeID={setBillTypeID} />
      )}
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
