import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_tarifa', label: 'Código', align: 'center' },
  { id: 'subgrupo', label: 'Subgrupo', align: 'center' },
  { id: 'posto_tarifario', label: 'Posto Tarifário', align: 'center' },
  { id: 'tarifa_tusd', label: 'TUSD', align: 'center' },
  { id: 'tarifa_te', label: 'TE', align: 'center' },
  { id: 'tarifa_total', label: 'Tarifa Total', align: 'center' },
  { id: 'revisao_tarifaria', label: 'Revisão Tarifária', align: 'center' },
  { id: 'modalidade', label: 'Modalidade', align: 'center' }
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
          url: '/lista-tarifas'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/tarifas"
        headCells={ordersHeadCells}
        addRoute="/tarifas"
        editRoute="/tarifas"
      />
    
  );
}
