import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InputMask from 'react-input-mask';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import MainCard from 'components/MainCard';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';

export default function GenericForm({ title, fields, endpointPath }) {
  const { id } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const initialFormState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [formData, setFormData] = useState(initialFormState);
  const [options, setOptions] = useState({});
  const [filteredOptions, setFilteredOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    if (id) {
      axios.get(`${API_BASE_URL}${endpointPath}/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error('Erro ao carregar dados do item:', error));
    }

    fields.forEach((field) => {
      if (field.type === 'autocomplete') {
        axios.get(`${API_BASE_URL}${field.optionsEndpoint}`)
          .then((response) => {
            setOptions((prev) => ({ ...prev, [field.name]: response.data }));
            setFilteredOptions((prev) => ({ ...prev, [field.name]: response.data }));
          })
          .catch((error) => console.error(`Erro ao carregar opções para ${field.name}:`, error));
      } else if (field.type === 'select') {
        axios.get(`${API_BASE_URL}${field.optionsEndpoint}`)
          .then((response) => {
            setOptions((prev) => ({ ...prev, [field.name]: response.data }));
          })
          .catch((error) => console.error(`Erro ao carregar opções para ${field.name}:`, error));
      }
    });
  }, [id, API_BASE_URL, endpointPath, fields]);

  const handleAutocompleteInputChange = (value, field) => {
    const fieldOptions = options[field.name] || [];
    setFilteredOptions((prev) => ({
      ...prev,
      [field.name]: fieldOptions.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      ),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = id ? 'put' : 'post';
      await axios[method](`${API_BASE_URL}${endpointPath}${id ? `/${id}` : ''}`, formData);
      setMessage('Operação realizada com sucesso!');
      setSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage('Erro ao realizar a operação. Tente novamente.');
      setSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title={title}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

          if (field.type === 'mask') {
            return (
              <InputMask
                key={field.name}
                mask={field.mask}
                value={formData[field.name] || ''}
                onChange={handleChange}
              >
                {() => (
                  <TextField
                    label={field.label}
                    name={field.name}
                    fullWidth
                    required={field.required}
                  />
                )}
              </InputMask>
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

          if (field.type === 'autocomplete') {
            return (
              <Autocomplete
                key={field.name}
                options={filteredOptions[field.name] || []}
                getOptionLabel={(option) => option.label}
                onInputChange={(_, value) => handleAutocompleteInputChange(value, field)}
                onChange={(_, value) => handleChange({ target: { name: field.name, value: value?.value || '' } })}
                renderInput={(params) => (
                  <TextField {...params} label={field.label} name={field.name} fullWidth required={field.required} />
                )}
                size='small'
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
                  size='small'
                >
                  {(options[field.name] || []).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          if (field.type === 'date') {
            return (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required={field.required}
              />
            );
          }

          if (field.type === 'decimal') {
            return (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d*(,\d{0,2})?$/.test(value)) {
                    handleChange({
                      target: {
                        name: field.name,
                        value: value.replace(',', '.')
                      }
                    });
                  }
                }}
                type="text"
                fullWidth
                required={field.required}
              />
            );
          }

          return null;
        })}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Salvando...' : id ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
      </Box>
    </MainCard>
  );
}
