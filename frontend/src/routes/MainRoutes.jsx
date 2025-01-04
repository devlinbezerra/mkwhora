import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// list-pages

//Cadastros
const ListBandeiras = Loadable(lazy(() => import('pages/cadastros/listBandeiras')));
const ListContratos = Loadable(lazy(() => import('pages/cadastros/listContratos')));
const ListUcs = Loadable(lazy(() => import('pages/cadastros/listUcs')));
const LIstClientes = Loadable(lazy(() => import('pages/cadastros/listClientes')));

//Parâmetros
const ListAgencias = Loadable(lazy(() => import('pages/parametros/listAgencia')));
const ListModalidades = Loadable(lazy(() => import('pages/parametros/listModalidade')));
const ListSubgrupo = Loadable(lazy(() => import('pages/parametros/listSubgrupos')));
const ListUsinas = Loadable(lazy(() => import('pages/parametros/listUsinas')));
const ListTipoCompensacao = Loadable(lazy(() => import('pages/parametros/listTipoCompensacao')));
const ListPostosTarifarios = Loadable(lazy(() => import('pages/parametros/listPostoTarifarios')));
const ListItensFatura = Loadable(lazy(() => import('pages/parametros/listItensFatura')));
const ListTarifas = Loadable(lazy(() => import('pages/parametros/listTarifas')));


// pages
const Agencias = Loadable(lazy(() => import('pages/parametros/agencia')));
const Modalidades = Loadable(lazy(() => import('pages/parametros/modalidades')));
const Subgrupo = Loadable(lazy(() => import('pages/parametros/subgrupo')));
const UsinasPage = Loadable(lazy(() => import('pages/parametros/usinas')));
const TipoCompensacao = Loadable(lazy(() => import('pages/parametros/tipo_compensacao')));
const PostosTarifarios = Loadable(lazy(() => import('pages/parametros/postos_tarifarios')));
const ItensFatura = Loadable(lazy(() => import('pages/parametros/itens_fatura')));
const Tarifas = Loadable(lazy(() => import('pages/parametros/tarifas')));
const Bandeiras = Loadable(lazy(() => import('pages/cadastros/bandeiras')));
const Contratos = Loadable(lazy(() => import('pages/cadastros/contratos')));
const Ucs = Loadable(lazy(() => import('pages/cadastros/ucs')));
const Clientes = Loadable(lazy(() => import('pages/cadastros/clientes')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'usinas',
      element: <UsinasPage />,
      children: [
        { path: ':id', element: <UsinasPage /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'list-agencias',
      element: <ListAgencias />
    },
    {
      path: 'agencias',
      element: <Agencias />,
      children: [
        { path: ':id', element: <Agencias /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'tipo-compensacao',
      element: <TipoCompensacao />,
      children: [
        { path: ':id', element: <TipoCompensacao /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'list-tipo-compensacao',
      element: <ListTipoCompensacao />
    },
    {
      path: 'list-grupos',
      element: <ListSubgrupo />
    },
    {
      path: 'grupos',
      element: <Subgrupo />,
      children: [
        { path: ':id', element: <Subgrupo /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'list-ucs',
      element: <ListUcs />
    },
    {
      path: 'ucs',
      element: <Ucs />,
      children: [
        { path: ':id', element: <Ucs /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'list-modalidades',
      element: <ListModalidades />
    },
    {
      path: 'modalidades',
      element: <Modalidades />,
      children: [
        { path: ':id', element: <Modalidades /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'postos-tarifarios',
      element: <PostosTarifarios />,
      children: [
        { path: ':id', element: <PostosTarifarios /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'list-postos-tarifarios',
      element: <ListPostosTarifarios />
    },
    {
      path: 'list-clientes',
      element: <LIstClientes />
    },
    {
      path: 'clientes',
      element: <Clientes />,
      children: [
        { path: ':id', element: <Clientes /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'list-contratos',
      element: <ListContratos />
    },
    {
      path: 'contratos',
      element: <Contratos />,
      children: [
        { path: ':id', element: <Contratos /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'itens-fatura',
      element: <ItensFatura />,
      children: [
        { path: ':id', element: <ItensFatura /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'list-itens-fatura',
      element: <ListItensFatura />
    },
    {
      path: 'list-usinas',
      element: <ListUsinas />
    },
    {
      path: 'list-tarifas',
      element: <ListTarifas />
    },
    {
      path: 'tarifas',
      element: <Tarifas />,
      children: [
        { path: ':id', element: <Tarifas /> } // Rota dinâmica para edição
      ]
    },
    {
      path: 'list-bandeiras',
      element: <ListBandeiras />
    },
    {
      path: 'bandeiras',
      element: <Bandeiras />,
      children: [
        { path: ':id', element: <Bandeiras /> } // Rota dinâmica para edição
      ]
    }
  ]
};

export default MainRoutes;
