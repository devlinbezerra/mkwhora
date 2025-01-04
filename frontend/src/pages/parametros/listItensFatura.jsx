import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_itens_fatura', label: 'Código', align: 'center' },
  { id: 'nome', label: 'Descrição', align: 'center' },
  { id: 'unidade', label: 'Unidade de Medida', align: 'center' },
  { id: 'tarifa', label: 'Tarifa', align: 'center' },
  { id: 'saldo', label: 'Saldo', align: 'center' },
  { id: 'injecao_usina', label: 'Injeção da Usina', align: 'center' },
  { id: 'SCEE', label: 'SCEE', align: 'center' },
  { id: 'ordem', label: 'Ordem', align: 'center' }
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Parâmetros',
      children: [
        {
          type: 'item',
          title: 'Cadastro de Itens de Fatura',
          url: '/lista-itens-fatura'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/itensfatura"
        headCells={ordersHeadCells}
        addRoute="/itens-fatura"
        editRoute="/itens-fatura"
      />
    
  );
}
