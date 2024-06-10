import { fetchPieChartData } from '@/services/http/bills';
import { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { format, isSameMonth as isSameMonthAndYear, parse } from 'date-fns';
import colors from 'tailwindcss/colors';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Card } from './Card';
import { capitaliseString } from '@/lib/utils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface PieSchemaData {
  name: 'Cobrança' | 'Imprevisto' | 'Salário' | 'Outros';
  total_amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export function Chart() {
  const [pieData, setPieData] = useState<PieSchemaData[]>([]);
  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    handleChartData();
  }, []);

  async function handleChartData() {
    try {
      const data = await fetchPieChartData();
      const newArray = data
        .map((item) => {
          const parsedDate = parse(item.period, 'MM/yyyy', new Date());
          const isSameMonth = isSameMonthAndYear(parsedDate, new Date());
          const pieColor =
            item.type === 'Salário'
              ? 'rgba(74, 222, 128, 1)'
              : 'rgba(248, 113, 113, 1)';
          const labelColor =
            item.type === 'Salário' ? colors.green[400] : colors.white;
          if (isSameMonth) {
            return {
              name: item.type,
              total_amount: item.total_amount,
              color: pieColor,
              legendFontColor: labelColor,
              legendFontSize: 15,
            };
          }
        })
        .filter(Boolean) as PieSchemaData[];
      if (newArray.length > 0) {
        setPieData(newArray);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Card>
      <View>
        <View className="pt-2 flex-row justify-center items-center gap-4 ">
          <FontAwesome5 name="chart-pie" size={24} color={colors.purple[200]} />
          <Text className="text-lg text-white text-center">
            {capitaliseString(format(new Date(), 'MMMM', { locale: ptBR }))}
          </Text>
        </View>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={250}
          chartConfig={pieChartConfig}
          accessor={'total_amount'}
          backgroundColor={'transparent'}
          paddingLeft={'10'}
          center={[10, 10]}
        />
      </View>
    </Card>
  );
}

const pieChartConfig = {
  color: (opacity = 1) => `rgba(3, 7, 18, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(3, 7, 18, ${opacity})`,
};

const chartConfig = {
  backgroundColor: colors.purple[400],
  backgroundGradientFrom: colors.purple[300],
  backgroundGradientTo: colors.purple[200],
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(3, 7, 18, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(3, 7, 18, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: colors.green[200],
  },
};
