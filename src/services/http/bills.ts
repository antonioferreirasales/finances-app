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

export interface searchBills {
  id: string;
  description: string;
  total_value: string;
  urgency: 'Low' | 'Medium' | 'High';
  due_date: string;
  cancelled_at: string | null;
  created_at: string;
  delay: string | null;
  finished_at: string | null;
  importance: string | null;
  is_active: boolean;
  is_recurring: boolean;
  net_value: string | null;
  pdf_url: string | null;
  receipt: string | null;
  type: 1 | 2 | 3 | 4;
  user_id: string;
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
    await api.post('/bills', transformedData);
  } catch (error) {
    throw error;
  }
}

export async function searchBills() {
  try {
    const { data } = await api.get('/bills');
    const bill: searchBills[] = data.bills;
    return bill;
  } catch (error) {
    throw error;
  }
}
