import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/@extended/Breadcrumbs';
import OrderTable from './List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

export default function TabelaComBreadcrumbs({ navigation, endpointPath, headCells, addRoute, editRoute }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  return (
    <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between" />
      <MainCard sx={{ mt: 2 }} content={false}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}
          > 
            <Breadcrumbs navigation={navigation} title card />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(addRoute)}
              sx={{ ml: 2, mt: 2, mb: 1, mr: 2 }}
            >
              Novo Registro
            </Button>
          </Box>
          <Box sx={{ margin: '16px' }}>
            <OrderTable
              endpoint={`${API_BASE_URL}${endpointPath}`}
              headCells={headCells}
              editRoute={editRoute} // Passa a rota de edição
            />
          </Box>
        </Box>
      </MainCard>
    </Grid>
  );
}

