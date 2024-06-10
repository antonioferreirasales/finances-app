import { billTypeMap } from '@/components/HistoryTable';
import { api } from '../api';

export interface createBillProps {
  billTypeID: number;
  description: string;
  is_recurring?: boolean;
  is_active?: boolean;
  urgency: 'Alta' | 'Média' | 'Baixa';
  total_value: string;
  gross_value?: string;
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
  gross_value: string | null;
  pdf_url: string | null;
  receipt: string | null;
  type: 1 | 2 | 3 | 4;
  user_id: string;
}

export interface PieSchema {
  type: 1 | 2 | 3 | 4;
  total_amount: number;
  month_year: string;
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

export async function fetchPieChartData() {
  try {
    const { data } = await api.get('/charts');
    const bill: PieSchema[] = data.bills;
    const bills = bill.map((item) => ({
      ...item,
      total_value: Number(item.total_amount),
      total_amount: Number(item.total_amount),
      period: item.month_year,
      type: billTypeMap[item.type],
    }));
    return bills;
  } catch (error) {
    throw error;
  }
}
