import React from "react";
import { Box, Typography, Icon } from "@mui/material";

const FinanceResumeItem = ({ title, Icon: IconComponent, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#7FC60F',
        color: 'white',
        borderRadius: '5px',
        padding: '5px 15px',
        width: { xs: '20%', sm: '30%' }, // Responsive width
        '@media (max-width: 750px)': {
          width: '20%',
          '& p': {
            fontSize: '12px',
          },
          '& span': {
            fontSize: '20px',
          },
          '& svg': {
            display: 'none',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          gap: '10px',
          margin: '20px auto',
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '20px' }}>
          {title}
        </Typography>
        <IconComponent sx={{ width: 25, height: 25 }} />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Box>
  );
};

export default FinanceResumeItem;