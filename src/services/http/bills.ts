import { api } from '../api';

export interface createBillProps {
  billTypeID: number;
  description: string;
  is_recurring?: boolean;
  is_active?: boolean;
  urgency: 'Alta' | 'Média' | 'Baixa';
  total_value: string;
  net_value?: string;
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
  } catch (error) {
    throw error;
  }
}
