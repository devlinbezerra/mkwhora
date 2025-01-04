import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_subgrupo', label: 'Código', align: 'center' },
  { id: 'grupo', label: 'Grupo', align: 'center' },
  { id: 'subgrupo', label: 'Subgrupo', align: 'center' }
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Parâmetros',
      children: [
        {
          type: 'item',
          title: 'Subgrupos',
          url: '/subgrupos'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/subgrupos"
        headCells={ordersHeadCells}
        addRoute="/grupos"
        editRoute="/grupos"
      />
    
  );
}
