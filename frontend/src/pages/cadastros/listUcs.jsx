import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_uc', label: 'Código', align: 'center' },
  { id: 'codigo_uc', label: 'UC', align: 'center' },
  { id: 'subgrupo', label: 'Subgrupo', align: 'center' },
  { id: 'optante_bt', label: 'Optante BT', align: 'center' },
  { id: 'tipo_ligacao', label: 'Tipo de Ligação', align: 'center' },
  { id: 'consumidor', label: 'Cliente', align: 'center' },
  { id: 'titularidade', label: 'Titularidade', align: 'center' },
  { id: 'cnpj_titular', label: 'CNPJ do Titular', align: 'center' },
  { id: 'desagio', label: 'Deságio', align: 'center' },
  { id: 'autoconsumo_remoto', label: 'É autoconsumo remoto?', align: 'center' },
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Cadastros',
      children: [
        {
          type: 'item',
          title: 'Unidades Consumidores',
          url: '/lista-ucs'
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/ucs"
        headCells={ordersHeadCells}
        addRoute="/ucs"
        editRoute="/ucs"
      />
    
  );
}
