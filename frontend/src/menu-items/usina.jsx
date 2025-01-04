// assets
import { DollarOutlined, ThunderboltOutlined } from '@ant-design/icons';

// icons
const icons = {
    DollarOutlined, ThunderboltOutlined
};

// ==============================|| MENU ITEMS - USINA ||============================== //

const usina = {
  id: 'group-usina',
  title: 'Usina',
  type: 'group',
  children: [
    {
      id: 'geracao',
      title: 'Geração',
      type: 'item',
      url: '/geracao/default',
      icon: icons.ThunderboltOutlined,
      breadcrumbs: false
    },
    {
        id: 'compensacao',
        title: 'Compensação de Energia',
        type: 'item',
        url: '/compensacao/default',
        icon: icons.ThunderboltOutlined,
        breadcrumbs: false
    },
    {
        id: 'revisao',
        title: 'Revisão Tarifária',
        type: 'item',
        url: '/revisao/default',
        icon: icons.ThunderboltOutlined,
        breadcrumbs: false
    }
  ]
};

export default usina;
