import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_modalidade', label: 'Código', align: 'center' },
  { id: 'descricao', label: 'Descrição', align: 'center' }
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Parâmetros',
      children: [
        {
          type: 'item',
          title: 'Modalidades',
          url: '/modalidades'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/modalidades"
        headCells={ordersHeadCells}
        addRoute="/modalidades"
        editRoute="/modalidades"
      />
    
  );
}
