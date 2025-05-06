import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskCard = ({ title, description, dueDate, onEdit, onDelete }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Data prazo: {dueDate}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" color="primary" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
