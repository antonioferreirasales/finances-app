import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Entry = {
  month_year: string;
  period: string;
  total_amount: number;
  total_value: number;
  type: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateFinances(
  currentMonthEntries: Entry[],
  previousMonthEntries: Entry[]
) {
  // Helper function to calculate the totals for a given month
  function calculateTotals(entries: Entry[]) {
    let totalIncome = 0;
    let totalExpense = 0;

    entries.forEach((entry) => {
      if (entry.type === 'Salário') {
        totalIncome += entry.total_amount;
      } else {
        totalExpense += entry.total_amount;
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }

  // Calculate totals for current and previous month
  const currentMonthTotals = calculateTotals(currentMonthEntries);
  const previousMonthTotals = calculateTotals(previousMonthEntries);
  const percentageSaved = getPercentage(
    currentMonthTotals.balance,
    previousMonthTotals.balance
  );

  // Calculate total saved compared to the previous month
  const totalSaved = currentMonthTotals.balance - previousMonthTotals.balance;

  return {
    totalSpent: currentMonthTotals.totalExpense,
    currentBalance: currentMonthTotals.balance,
    totalSaved,
    percentageSaved,
  };
}

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

export function getPercentage(thisMonth: number, pastMonth: number) {
  const porcentagemCrescimento = ((pastMonth - thisMonth) / pastMonth) * 100;
  return porcentagemCrescimento;
}
