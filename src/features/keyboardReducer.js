import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pushedLetter: 'E'

}

function addLetterReducer(state, action) {
  console.log('state', state);
  state
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    addLetter:addLetterReducer
  }
})

export const { addLetter } = keyboardSlice.actions
export default keyboardSlice.reducer