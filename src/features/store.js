import { configureStore} from '@reduxjs/toolkit';
import keyboardReducer from './keyboardReducer';

export const store = configureStore({
  reducer: {
    keyboardData: keyboardReducer,
  },
})

export default store