import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  game: {
    id: '',
    win: false,
    lost: false,
    error: ''
  },
  currentWord:{
    letters: [],
    colors: [],
    selected: 0
  },
  previousWords: null,
  error: '',
  loading: true,
  keyboard: {
    colors: null
  },
}

function addLetterReducer(state, action) {
  console.log('state', current(state));
  const currentState = current(state);

  return {
    ...state,
    currentWord:
    {
      letters : [action.payload],
      selected: currentState.currentWord.selected + 1,
    },
  }
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