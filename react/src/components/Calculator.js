import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import CalculatorDisplay from './CalculatorDisplay';
import { styled } from '@mui/system';

const CalculatorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 400,
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[5],
}));

const ButtonStyled = styled(Button)(({ theme, operation, equals }) => ({
  height: 60,
  fontSize: '1.2rem',
  backgroundColor: equals 
    ? theme.palette.primary.main 
    : operation 
      ? theme.palette.secondary.main 
      : theme.palette.grey[300],
  color: equals || operation ? '#fff' : '#000',
  '&:hover': {
    backgroundColor: equals 
      ? theme.palette.primary.dark 
      : operation 
        ? theme.palette.secondary.dark 
        : theme.palette.grey[400],
  },
}));

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      if (waitingForSecondValue) {
        setDisplay(value);
        setWaitingForSecondValue(false);
      } else {
        setDisplay(display + value);
      }
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
  };

  const handleEqualsClick = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '×') {
      result = previousValue * currentValue;
    } else if (operation === '÷') {
      if (currentValue === 0) {
        setDisplay('Error');
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <CalculatorContainer elevation={3}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CalculatorDisplay value={display} />
        <Grid container spacing={1}>
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              {btn === '=' ? (
                <ButtonStyled
                  variant="contained"
                  fullWidth
                  equals="true"
                  onClick={handleEqualsClick}
                >
                  {btn}
                </ButtonStyled>
              ) : btn === 'C' ? (
                <ButtonStyled
                  variant="contained"
                  fullWidth
                  onClick={handleClearClick}
                >
                  {btn}
                </ButtonStyled>
              ) : ['+', '-', '×', '÷'].includes(btn) ? (
                <ButtonStyled
                  variant="contained"
                  fullWidth
                  operation="true"
                  onClick={() => handleOperationClick(btn)}
                >
                  {btn}
                </ButtonStyled>
              ) : (
                <ButtonStyled
                  variant="contained"
                  fullWidth
                  onClick={() => handleNumberClick(btn)}
                >
                  {btn}
                </ButtonStyled>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </CalculatorContainer>
  );
};

export default Calculator;
