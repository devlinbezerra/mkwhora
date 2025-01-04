import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_bandeira', label: 'Código', align: 'center' },
  { id: 'descricao', label: 'Desrição', align: 'center' },
  { id: 'tarifa_bandeira', label: 'Tarifa da Bandeira', align: 'center' }
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Bandeiras',
      children: [
        {
          type: 'item',
          title: 'Lista de Bandeiras',
          url: '/lista-bandeiras' //se colocar list-clientes dá erro repetindo o breadcrumb
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/bandeira"
        headCells={ordersHeadCells}
        addRoute="/bandeiras"
        editRoute="/bandeiras"
      />
    
  );
}
