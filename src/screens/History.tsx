import { HistoryTable } from '@/components/HistoryTable';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export function History() {
  return (
    <SafeAreaView>
      <HistoryTable />
    </SafeAreaView>
  );
}
