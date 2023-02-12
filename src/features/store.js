import { configureStore } from '@reduxjs/toolkit';
import keyboardReducer from './keyboardReducer';

export const store = configureStore({
  reducer: {
    game: keyboardReducer,
  },
})

export default store