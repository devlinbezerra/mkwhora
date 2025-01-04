import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_contrato', label: 'Código', align: 'center' },
  { id: 'id_consumidor', label: 'Cliente', align: 'center' },
  { id: 'data_inicio', label: 'Início', align: 'center' },
  { id: 'data_fim', label: 'Término', align: 'center' },
  { id: 'desagio_a', label: 'Deságio Grupo A', align: 'center' },
  { id: 'desagio_b', label: 'Deságio Grupo B', align: 'center' },
  { id: 'bandeira', label: 'Cobra Bandeira?', align: 'center' }
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Cadastros',
      children: [
        {
          type: 'item',
          title: 'Contratos',
          url: '/lista-contratos'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/contratos"
        headCells={ordersHeadCells}
        addRoute="/contratos"
        editRoute="/contratos"
      />
    
  );
}
