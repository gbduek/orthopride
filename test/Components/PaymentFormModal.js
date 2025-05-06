import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const PaymentFormModal = ({ open, onClose, onSubmit, payment, setPayment }) => {
  // Format currency function
  const formatCurrency = (value) => {
    // Removes any non-digit characters
    const numericValue = value.replace(/[^\d]/g, '');
    
    // Convert to number, divide by 100 to get two decimals, format to Brazilian currency
    const formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    return formattedValue;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Informações Básicas
        </Typography>
        <TextField
          label="Descrição"
          fullWidth
          margin="normal"
          value={payment.description}
          onChange={(e) => setPayment({ ...payment, description: e.target.value })}
        />
        <TextField
          label="Valor"
          fullWidth
          margin="normal"
          value={formatCurrency(payment.amount)}
          onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
        />
        <TextField
          label="Vencimento"
          fullWidth
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={payment.dueDate}
          onChange={(e) => setPayment({ ...payment, dueDate: e.target.value })}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Forma de Pagamento</InputLabel>
          <Select
            value={payment.paymentMethod}
            onChange={(e) => setPayment({ ...payment, paymentMethod: e.target.value })}
          >
            <MenuItem value="Débito">Débito</MenuItem>
            <MenuItem value="Crédito">Crédito</MenuItem>
            <MenuItem value="Pix">Pix</MenuItem>
            <MenuItem value="Boleto">Boleto</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Conta"
          fullWidth
          margin="normal"
          value={payment.account}
          onChange={(e) => setPayment({ ...payment, account: e.target.value })}
        />
        <TextField
          label="Fornecedor"
          fullWidth
          margin="normal"
          value={payment.provider}
          onChange={(e) => setPayment({ ...payment, provider: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
};

export default PaymentFormModal;
