import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';

export default function GenericForm({ title, fields, endpointPath }) {
  const { id } = useParams();

  const initialFormState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [selectOptions, setSelectOptions] = useState({});
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}${endpointPath}/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Erro ao carregar dados do item:', error);
        }
      };
      fetchData();
    }

    fields.forEach((field) => {
      if (field.type === 'select' && field.optionsEndpoint) {
        axios.get(`${API_BASE_URL}${field.optionsEndpoint}`)
          .then((response) => {
            setSelectOptions((prev) => ({ ...prev, [field.name]: response.data }));
          })
          .catch((error) => {
            console.error(`Erro ao carregar opções para ${field.name}:`, error);
          });
      }
    });
  }, [id, API_BASE_URL, endpointPath, fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const url = `${API_BASE_URL}${endpointPath}${id ? `/${id}` : ''}`;
      const method = id ? 'put' : 'post';

      const response = await axios[method](url, formData);

      setMessage('Operação realizada com sucesso!');
      setSeverity('success');
      setOpenSnackbar(true);

      if (!id) setFormData(initialFormState);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage('Erro ao realizar a operação. Tente novamente.');
      setSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <MainCard title={title}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          Preencha os detalhes abaixo:
        </Typography>

        {fields.map((field) => {
          if (field.type === 'text' || field.type === 'number' || field.type === 'email') {
            return (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                type={field.type}
                fullWidth
                required={field.required}
              />
            );
          }

          if (field.type === 'radio') {
            return (
              <FormControl key={field.name}>
                <Typography>{field.label}</Typography>
                <RadioGroup
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                >
                  {field.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            );
          }

          if (field.type === 'checkbox') {
            return (
              <FormControlLabel
                key={field.name}
                control={
                  <Checkbox
                    checked={!!formData[field.name]}
                    onChange={handleChange}
                    name={field.name}
                  />
                }
                label={field.label}
              />
            );
          }

          if (field.type === 'select') {
            return (
              <FormControl fullWidth key={field.name}>
                <Typography>{field.label}</Typography>
                <Select
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  name={field.name}
                >
                  {(selectOptions[field.name] || []).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          if (field.type === 'file') {
            return (
              <TextField
                key={field.name}
                type="file"
                name={field.name}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.files[0] })}
                fullWidth
              />
            );
          }

          return null;
        })}

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Salvando...' : id ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>

        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </MainCard>
  );
}
