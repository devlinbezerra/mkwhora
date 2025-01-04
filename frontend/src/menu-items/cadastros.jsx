// assets
import { DollarOutlined, TeamOutlined, ApiOutlined, FlagOutlined, FileTextOutlined, BankOutlined, AuditOutlined } from '@ant-design/icons';

// icons
const icons = {
    DollarOutlined, TeamOutlined, ApiOutlined, FlagOutlined, FileTextOutlined, BankOutlined, AuditOutlined
};

// ==============================|| MENU ITEMS - CADASTROS ||============================== //

const cadastro = {
  id: 'group-cadastro',
  title: 'Cadastros',
  type: 'group',
  children: [
    {
      id: 'list-clientes',
      title: 'Clientes',
      type: 'item',
      url: '/list-clientes',
      icon: icons.TeamOutlined,
      breadcrumbs: true
    },
    {
      id: 'list-ucs',
      title: 'Unidades Consumidoras',
      type: 'item',
      url: '/list-ucs',
      icon: icons.AuditOutlined,
      breadcrumbs: true
    },
    {
      id: 'list-concessionarias',
      title: 'Concessionárias',
      type: 'item',
      url: '/list-agencias',
      icon: icons.BankOutlined,
      breadcrumbs: true
    },
    {
      id: 'list-usinas',
      title: 'Usinas',
      type: 'item',
      url: '/list-usinas',
      icon: icons.ApiOutlined,
      breadcrumbs: true
    },
    {
      id: 'list-contratos',
      title: 'Contratos',
      type: 'item',
      url: '/list-contratos',
      icon: icons.FileTextOutlined,
      breadcrumbs: true
    },
    {
      id: 'list-bandeiras',
      title: 'Bandeiras Tarifárias',
      type: 'item',
      url: '/list-bandeiras',
      icon: icons.FlagOutlined,
      breadcrumbs: true
    }
  ]
};

export default cadastro;
