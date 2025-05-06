import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const TaskFilter = ({ onFilter }) => {
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState(null);

  const handleFilter = () => {
    onFilter({ status, dueDate });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Filtrar Tarefas</Typography>
        <TextField
          label="Status"
          variant="outlined"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ mb: 1 }}
        />
        <DatePicker
          label="Data Prazo"
          value={dueDate}
          onChange={(date) => setDueDate(date)}
          renderInput={(params) => <TextField {...params} fullWidth />}
          sx={{ mb: 2 }}
        />
        <Button sx={{marginLeft: '25px', marginTop: '10px'}}variant="contained" color="primary" onClick={handleFilter}>
          Aplicar Filtros
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default TaskFilter;