import { configureStore } from '@reduxjs/toolkit';
import { calReducer } from '../features/Calculator/CalculatorSlice';

export const store = configureStore({
  reducer: {

    calculator:calReducer
  },
});
