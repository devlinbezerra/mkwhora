import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Button, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  textAlign: 'center',
}));

const ConfirmModal = ({ 
  open, 
  onClose, 
  item, 
  endpoint, 
  onDeleteSuccess 
}) => {
  const confirmDelete = async () => {
    if (!endpoint || !item || !item.id) {
      console.error("Endpoint ou item inválido para exclusão.");
      return;
    }

    try {
      const url = `${endpoint}/${item.id}`;
      await axios.delete(url);
      console.log(`Item com ID ${item.id} excluído com sucesso.`);
      onDeleteSuccess(item.id);
      onClose();
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
      alert("Ocorreu um erro ao excluir o item. Tente novamente.");
    }
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6">Você tem certeza que deseja excluir este item?</Typography>
        {item && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1"><strong>Resumo do item:</strong></Typography>
            {Object.entries(item).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key}:</strong> {value !== undefined ? value : 'N/A'}
              </Typography>
            ))}
          </Box>
        )}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Excluir
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </Stack>
      </ModalContent>
    </StyledModal>
  );
};

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired, // Aceitando qualquer estrutura de objeto
  endpoint: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default ConfirmModal;
