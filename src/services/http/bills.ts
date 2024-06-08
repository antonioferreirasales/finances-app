import { api } from '../api';

interface createBillProps {
  billTypeID: number;
  is_recurring?: boolean;
  is_active?: boolean;
  urgency: 'Alta' | 'Média' | 'Baixa';
  total_value: string;
  due_date: Date;
}

const urgencyMap: {
  [key in createBillProps['urgency']]: 'High' | 'Medium' | 'Low';
} = {
  Alta: 'High',
  Média: 'Medium',
  Baixa: 'Low',
};

export async function createBill(billData: createBillProps) {
  try {
    const transformedData = {
      ...billData,
      urgency: urgencyMap[billData.urgency],
    };
    const { data } = await api.post('/bills', transformedData);
    console.log(data);
  } catch (error) {
    throw error;
  }
}
