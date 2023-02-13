import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  game: {
    id: '',
    win: false,
    lost: false,
    error: ''
  },
  currentWord:{
    letters: ['','','','',''],
    colors: ['','','','',''],
    selected: 0
  },
  previousWords: null,
  error: '',
  loading: true,
  keyboard: {
    colors: null
  },
}

function selectLetterAction(state, action) {
  const currentState = current(state);
  let currentLetters = [...currentState.currentWord.letters];
  return {
    ...state,
    currentWord:
    {
      letters : currentLetters,
      selected: action.payload,
    },
  }
}

function checkWordLenght(wordLength) {
  let isCorrectLength = (wordLength === 5) ? true : false;
    return isCorrectLength;  
}

function nextLetterSelected(currentLetters) {
  for (let i = 0; i < currentLetters.length; i++) {
    const letter = currentLetters[i];
    if (letter === '') {
      return i;      
    }
  }
}

function addLetterAction(state, action) {
  const currentState = current(state);
  const currentLetter = action.payload
  let currentLetters = [...currentState.currentWord.letters];
  currentLetters[currentState.currentWord.selected] = currentLetter;

  if (checkWordLenght(currentState.currentWord.selected)) { return };
  let nextSelected = nextLetterSelected(currentLetters); 

  return {
    ...state,
    currentWord:
    {
      letters : currentLetters,
      selected: nextSelected,
    },
  }
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    addLetter:addLetterAction,
    selectLetter:selectLetterAction
  }
})

export const { addLetter, selectLetter } = keyboardSlice.actions
export default keyboardSlice.reducer