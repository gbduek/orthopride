import React from "react";
import { TableRow, TableCell, IconButton, Typography } from "@mui/material";
import { ArrowDownward, ArrowUpward, Delete } from "@mui/icons-material";

const FinanceGridItem = ({ item, onDelete }) => {
  return (
    <TableRow>
      <TableCell sx={{ paddingTop: '15px', textAlign: 'start', wordBreak: 'break-all' }}>
        <Typography variant="body2">{item.desc}</Typography>
      </TableCell>
      <TableCell sx={{ paddingTop: '15px', textAlign: 'start', wordBreak: 'break-all' }}>
        <Typography variant="body2">{item.amount}</Typography>
      </TableCell>
      <TableCell 
        sx={{ 
          paddingTop: '15px', 
          textAlign: 'center', 
          wordBreak: 'break-all'
        }}
      >
        {item.expense ? (
          <ArrowDownward color="error" />
        ) : (
          <ArrowUpward color="success" />
        )}
      </TableCell>
      <TableCell 
        sx={{ 
          paddingTop: '15px', 
          textAlign: 'center', 
          wordBreak: 'break-all'
        }}
      >
        <IconButton onClick={() => onDelete(item.id)}>
          <Delete color="action" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default FinanceGridItem;