import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const DisplayField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    fontSize: '2rem',
    textAlign: 'right',
    padding: theme.spacing(1),
  },
}));

const CalculatorDisplay = ({ value }) => {
  return (
    <DisplayField
      fullWidth
      variant="outlined"
      value={value}
      disabled
    />
  );
};

export default CalculatorDisplay;
