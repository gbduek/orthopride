import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const TaskForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');

  const handleSubmit = () => {
    onSubmit({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">Criar/Editar Tarefa</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 1 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 1 }}
      />
      <TextField
        label="Data Prazo"
        type="date"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {initialData ? 'Update Task' : 'Create Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;