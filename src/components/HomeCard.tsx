import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Card } from './Card';
import { styled } from 'nativewind';
import Fontisto from '@expo/vector-icons/Fontisto';
import { fetchPieChartData } from '@/services/http/bills';
import {
  parse,
  isSameMonth as isSameMonthAndYear,
  isThisMonth,
  startOfMonth,
  endOfMonth,
  subMonths,
  isWithinInterval,
} from 'date-fns';
import { calculateFinances, formatCurrency, getPercentage } from '@/lib/utils';
import { CardButton } from './CardButton';

const StyledView = styled(View);
const StyledText = styled(Text);

interface InfoCardProps {
  totalSpent: number;
  currentBalance: number;
  totalSaved: number;
  percentageSaved: number;
}

interface homeCard {
  handleNewBillButton: () => void;
}
export function HomeCard({ handleNewBillButton }: homeCard) {
  const [balance, setBalance] = useState<InfoCardProps>({
    currentBalance: 0,
    totalSaved: 0,
    totalSpent: 0,
    percentageSaved: 0,
  });
  async function handleData() {
    try {
      const data = await fetchPieChartData();
      const billsSameMonth = data.filter((item) => {
        const parsedDate = parse(item.period, 'MM/yyyy', new Date());
        const isSameMonth = isThisMonth(parsedDate);
        return isSameMonth;
      });
      const billsPassMonth = data.filter((item) => {
        const parsedDate = parse(item.period, 'MM/yyyy', new Date());
        const now = new Date();
        const startOfLastMonth = startOfMonth(subMonths(now, 1));
        const endOfLastMonth = endOfMonth(subMonths(now, 1));
        return isWithinInterval(parsedDate, {
          start: startOfLastMonth,
          end: endOfLastMonth,
        });
      });
      const { currentBalance, totalSaved, totalSpent, percentageSaved } =
        calculateFinances(billsSameMonth, billsPassMonth);
      setBalance((prevState) => ({
        ...prevState,
        currentBalance,
        totalSaved,
        totalSpent,
        percentageSaved,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <Card className="h-full w-full max-w-sm px-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
      <StyledView className="flex items-center space-x-4">
        <StyledView className="flex-1">
          <StyledText className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Balanço mensal
          </StyledText>
          <StyledText className="text-sm text-gray-500 dark:text-gray-400">
            Seu balanço mensal.
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledView className="mt-4 flex items-center justify-between">
        <StyledView className="flex items-center space-x-2">
          <StyledText className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(balance.currentBalance)}
          </StyledText>
        </StyledView>
        <StyledText className="text-sm text-gray-500 dark:text-gray-400">
          {balance.percentageSaved.toFixed(2)}% do mês passado
        </StyledText>
      </StyledView>
      <StyledView className="flex-row justify-around">
        <StyledView className="mt-4 flex items-center justify-between">
          <StyledView className="flex items-center space-x-2">
            <WalletIcon />
            <StyledText className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Economizado
            </StyledText>
          </StyledView>
          <StyledText className="text-sm text-gray-500 dark:text-gray-400">
            {formatCurrency(balance.totalSaved)}
          </StyledText>
        </StyledView>
        <StyledView className="mt-4 flex items-center justify-center">
          <StyledView className="flex items-center space-x-2">
            <CreditCardIcon />
            <StyledText className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Gasto
            </StyledText>
          </StyledView>
          <StyledText className="text-sm text-gray-500 dark:text-gray-400">
            {formatCurrency(balance.totalSpent)}
          </StyledText>
        </StyledView>
      </StyledView>
      <CardButton
        title="Adicione uma nova conta"
        onPress={handleNewBillButton}
      />
      <CardButton title="Atualizar" onPress={handleData} />
    </Card>
  );
}

function CreditCardIcon() {
  return <Fontisto name="credit-card" size={24} color="black" />;
}

function WalletIcon() {
  return <Fontisto name="wallet" size={24} color="black" />;
}
