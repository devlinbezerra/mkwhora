import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmModal from './ConfirmModal';
import Dot from 'components/@extended/Dot';

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.number.isRequired,
};

export default function OrderTable({ endpoint, headCells, editRoute }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);

      const normalizedRows = response.data.map((row) => {
        const rowIdKey = Object.keys(row).find((key) => key.startsWith('id'));
        return {
          ...row,
          id: row[rowIdKey],
        };
      });

      setRows(normalizedRows);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const handleEdit = (id) => {
    navigate(`${editRoute}/${id}`); // Redireciona para a rota de edição
  };

  const openDeleteModal = (item) => {
    const itemIdKey = Object.keys(item).find((key) => key.startsWith('id'));

    if (!itemIdKey) {
      console.error('Não foi possível identificar o campo de ID no item.', item);
      return;
    }

    const normalizedItem = {
      ...item,
      id: item[itemIdKey],
    };

    setSelectedItem(normalizedItem);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteSuccess = (deletedId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== deletedId));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id} align={headCell.align || 'left'}>
                  {headCell.label}
                </TableCell>
              ))}
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.id}>
                {headCells.map((cell) => (
                  <TableCell key={`${row.id}-${cell.id}`} align={cell.align || 'left'}>
                    {cell.id === 'status' ? <OrderStatus status={row[cell.id]} /> : row[cell.id] || '-'}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDeleteModal(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmModal
        open={isModalOpen}
        onClose={closeDeleteModal}
        endpoint={endpoint}
        item={selectedItem}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </Box>
  );
}

OrderTable.propTypes = {
  endpoint: PropTypes.string.isRequired,
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
    })
  ).isRequired,
  editRoute: PropTypes.string.isRequired, // Rota de edição dinâmica
};
