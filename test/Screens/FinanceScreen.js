import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Input } from '@mui/material';
import FinanceResume from '../Components/FinanceSc/FinanceResume';
import FinanceForm from '../Components/FinanceSc/FinanceForm';

const FinanceScreen = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      // Aqui você pode adicionar a lógica para processar o PDF
    }
  };  

  useEffect(() => {
    // Calculate expenses, income, and total
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const totalExpense = amountExpense.reduce((acc, cur) => acc + cur, 0);
    const totalIncome = amountIncome.reduce((acc, cur) => acc + cur, 0);

    const formattedExpense = totalExpense.toFixed(2);
    const formattedIncome = totalIncome.toFixed(2);
    const formattedTotal = Math.abs(totalIncome - totalExpense).toFixed(2);

    setIncome(`R$ ${formattedIncome}`);
    setExpense(`R$ ${formattedExpense}`);
    setTotal(`${totalIncome < totalExpense ? '-' : ''}R$ ${formattedTotal}`);
  }, [transactionsList]);

  const handleAdd = (transaction) => {
    const newArrayTransactions = [...transactionsList, transaction];
    setTransactionsList(newArrayTransactions);
  };

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h2" component="h1" 
                    sx={{marginBottom: '40px', color: '#7FC60F', fontWeight: 'bold'}}
                    fontFamily={'poppins'} fontWeight={'bold'}
                    gutterBottom>
          Controle Financeiro
        </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ mb: 2, backgroundColor: '#7FC60F', '&:hover': { backgroundColor: '#6bbf07' } }}
        >
          Importar PDF
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            sx={{ display: 'none' }}
          />
        </Button>
        <FinanceResume income={income} expense={expense} total={total} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <FinanceForm handleAdd={handleAdd} transactionsList={transactionsList} setTransactionsList={setTransactionsList} />
      </Box>
    </Container>
  );
};

export default FinanceScreen;
