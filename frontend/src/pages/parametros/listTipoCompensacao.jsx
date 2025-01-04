import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_tipo_compensacao', label: 'Código', align: 'center' },
  { id: 'descricao', label: 'Nome', align: 'center' }
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Parâmetros',
      children: [
        {
          type: 'item',
          title: 'Tipo de Compensação',
          url: '/lista-agencias'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/tipocompensacao"
        headCells={ordersHeadCells}
        addRoute="/tipo-compensacao"
        editRoute="/tipo-compensacao"
      />
    
  );
}
