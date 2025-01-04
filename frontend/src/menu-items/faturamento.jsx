// assets
import { DollarOutlined, FileOutlined } from '@ant-design/icons';

// icons
const icons = {
    DollarOutlined, FileOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const faturamento = {
  id: 'group-faturamento',
  title: 'Faturamento',
  type: 'group',
  children: [
    {
      id: 'fatura-concessionaria',
      title: 'Faturas da Concessionária',
      type: 'item',
      url: '/fatura-concessionaria/default',
      icon: icons.FileOutlined,
      breadcrumbs: false
    },
    {
        id: 'fatura-usina',
        title: 'Faturas da Usina',
        type: 'item',
        url: '/fatura-usina/default',
        icon: icons.DollarOutlined,
        breadcrumbs: false
      }
  ]
};

export default faturamento;
