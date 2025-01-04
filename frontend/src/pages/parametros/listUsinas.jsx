import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_usina', label: 'Código', align: 'center' },
  { id: 'descricao', label: 'Descrição', align: 'center' },
  { id: 'potencia', label: 'Potência (KW)', align: 'center' },
  { id: 'tipo', label: 'Tipo', align: 'center' }
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Parâmetros',
      children: [
        {
          type: 'item',
          title: 'Usinas',
          url: '/usinas'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/usinas"
        headCells={ordersHeadCells}
        addRoute="/usinas"
      />
    
  );
}
