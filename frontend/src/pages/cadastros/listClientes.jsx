import TabelaComBreadcrumbs from '../ListPage';

const ordersHeadCells = [
  { id: 'id_consumidor', label: 'Código', align: 'center' },
  { id: 'cnpj', label: 'CNPJ', align: 'center' },
  { id: 'razao_social', label: 'Razão Social', align: 'center' },
  { id: 'nome_fantasia', label: 'Nome Fantasia', align: 'center' },
  { id: 'email_responsavel', label: 'E-mail do Responsável', align: 'center' },
  { id: 'telefone_responsavel', label: 'Telefone do ', align: 'center' },

];

const ordersNavigation = {
  items: [
    {
      type: 'group',
      title: 'Cadastros',
      children: [
        {
          type: 'item',
          title: 'Lista de Clientes',
          url: '/lista-clientes' //se colocar list-clientes dá erro repetindo o breadcrumb
        }
      ]
    }
  ]
};

export default function OrdersPage() {
  return (
      <TabelaComBreadcrumbs
        navigation={ordersNavigation}
        endpointPath="/consumidores"
        headCells={ordersHeadCells}
        addRoute="/clientes"
        editRoute="/clientes"
      />
    
  );
}
