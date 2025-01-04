import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_posto_tarifario', label: 'Código', align: 'center' },
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
          title: 'Postos Tarifários',
          url: '/postotarifarios'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/postotarifarios"
        headCells={ordersHeadCells}
        addRoute="/postos-tarifarios"
        editRoute="/postos-tarifarios"
      />
    
  );
}
