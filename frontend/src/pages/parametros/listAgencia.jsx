import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_agencia', label: 'Código', align: 'center' },
  { id: 'nome', label: 'Nome', align: 'center' },
  { id: 'cnpj', label: 'CNPJ', align: 'center' },
  { id: 'link_faturas', label: 'Link', align: 'center' },
  { id: 'telefone_suporte', label: 'Telefone', align: 'center' },
  { id: 'email_suporte', label: 'E-mail', align: 'center' }
];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Parâmetros',
      children: [
        {
          type: 'item',
          title: 'Concessionárias de Energia',
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
        endpointPath="/agencias"
        headCells={ordersHeadCells}
        addRoute="/agencias"
        editRoute="/agencias"
      />
    
  );
}
