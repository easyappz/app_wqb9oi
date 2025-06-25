import React from 'react';
import { Box, Typography } from '@mui/material';
import Calculator from '../components/Calculator';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Simple Calculator
      </Typography>
      <Calculator />
    </Box>
  );
};

export default Home;
