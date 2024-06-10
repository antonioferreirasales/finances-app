import { PieSchema, fetchPieChartData } from '@/services/http/bills';
import { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {
  format,
  getMonth,
  isSameMonth as isSameMonthAndYear,
  parse,
  parseISO,
} from 'date-fns';
import colors from 'tailwindcss/colors';
import { ptBR } from 'date-fns/locale/pt-BR';

interface PieSchemaData {
  name: 'Cobrança' | 'Imprevisto' | 'Salário' | 'Outros';
  total_amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

export function Chart() {
  const [pieData, setPieData] = useState<PieSchemaData[]>([]);
  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    handleChartData();
  }, []);

  async function handleChartData() {
    try {
      const data = await fetchPieChartData();
      console.log(data);
      const newArray = data
        .map((item) => {
          const parsedDate = parse(item.period, 'MM/yyyy', new Date());
          console.log(parsedDate);
          const isSameMonth = isSameMonthAndYear(parsedDate, new Date());
          console.log(isSameMonth);
          const pieColor =
            item.type === 'Salário'
              ? 'rgba(74, 222, 128, 1)'
              : 'rgba(248, 113, 113, 1)';
          const labelColor =
            item.type === 'Salário' ? colors.green[400] : colors.red[400];
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
    <View>
      <View>
        <Text className="text-lg text-red-300 text-center">
          Balanço do mês {format(new Date(), 'MMMM', { locale: ptBR })}
        </Text>
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

      {/* <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={220}
        yAxisLabel="R$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}
    </View>
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
