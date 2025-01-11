import { RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl'; // Importação do IntlProvider

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { SupabseProvider as AuthProvider } from 'contexts/SupabaseContext';

// Importação de mensagens traduzidas
import messages from 'utils/locales/pt'; // Ajuste para o caminho correto das mensagens

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const locale = 'pt'; // Idioma atual, ajuste conforme necessário

  return (
    <ThemeCustomization>
      <RTLLayout>
        <IntlProvider locale={locale} messages={messages}>
          <ScrollTop>
            <AuthProvider>
              <>
                <Notistack>
                  <RouterProvider router={router} />
                  <Snackbar />
                </Notistack>
              </>
            </AuthProvider>
          </ScrollTop>
        </IntlProvider>
      </RTLLayout>
    </ThemeCustomization>
  );
}
