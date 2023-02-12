import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pushedLetter: 'E'

}

function addLetter(state, action) {
  state
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    addLetter:addLetter
  }
})

export const { addLetter } = keyboardSlice.actions
export default keyboardSlice.reducer