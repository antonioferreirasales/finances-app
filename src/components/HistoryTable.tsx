import { searchBills } from '@/services/http/bills';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useState, useEffect } from 'react';
import { Button, DataTable } from 'react-native-paper';

export function HistoryTable() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 15, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [items, setItems] = useState<searchBills[]>([]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  async function fetchData() {
    try {
      const billsData = await searchBills();
      setItems(billsData);
      setPage(0);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [itemsPerPage]);

  return (
    <DataTable className=" bg-red-50">
      <DataTable.Header>
        <DataTable.Title>Descrição</DataTable.Title>
        <DataTable.Title>Valor</DataTable.Title>
        <DataTable.Title>Tipo</DataTable.Title>
        <DataTable.Title sortDirection="descending">Criado em</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => {
        const transformedData = {
          ...item,
          type: billTypeMap[item.type],
        };
        return (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.description}</DataTable.Cell>
            <DataTable.Cell>{item.total_value}</DataTable.Cell>
            <DataTable.Cell>{transformedData.type}</DataTable.Cell>
            <DataTable.Cell>
              {format(item.due_date, 'dd/MM/yyyy', { locale: ptBR })}
            </DataTable.Cell>
          </DataTable.Row>
        );
      })}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} de ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Linhas por página'}
      />
      <Button onPress={fetchData}>Atualizar</Button>
    </DataTable>
  );
}

interface BillTypeMap {
  [key: number]: 'Cobrança' | 'Imprevisto' | 'Salário' | 'Outros';
}

const billTypeMap: BillTypeMap = {
  1: 'Cobrança',
  2: 'Imprevisto',
  3: 'Salário',
  4: 'Outros',
};
