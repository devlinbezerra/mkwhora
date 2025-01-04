// assets
import { SettingOutlined } from '@ant-design/icons';

// icons
const icons = {
  SettingOutlined
};

// ==============================|| MENU ITEMS - PARAMETROS ||============================== //

const parametros = {
  id: 'group-parametros',
  title: 'Parâmetros',
  type: 'group',
  children: [
    {
      id: 'list-modalidades',
      title: 'Modalidades',
      type: 'item',
      url: '/list-modalidades',
      icon: icons.SettingOutlined,
      breadcrumbs: true
    },
    {
        id: 'list-postos-tarifarios',
        title: 'Postos Tarifários',
        type: 'item',
        url: '/list-postos-tarifarios',
        icon: icons.SettingOutlined,
        breadcrumbs: true
      },
      {
        id: 'list-grupos',
        title: 'Grupos Tarifários',
        type: 'item',
        url: '/list-grupos',
        icon: icons.SettingOutlined,
        breadcrumbs: true
      },
      {
        id: 'list-tipo-compensacao',
        title: 'Tipo de Compensação',
        type: 'item',
        url: '/list-tipo-compensacao',
        icon: icons.SettingOutlined,
        breadcrumbs: true
      },
      {
        id: 'list-itens-fatura',
        title: 'Itens de Fatura',
        type: 'item',
        url: '/list-itens-fatura',
        icon: icons.SettingOutlined,
        breadcrumbs: true
      },
      {
        id: 'list-tarifas',
        title: 'Tarifas',
        type: 'item',
        url: '/list-tarifas',
        icon: icons.SettingOutlined,
        breadcrumbs: true
      }
  ]
};

export default parametros;
