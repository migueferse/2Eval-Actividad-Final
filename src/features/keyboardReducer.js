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

function deleteLetterAction(state) {
  const currentState = current(state);
  const letterSelected = currentState.currentWord.selected;
  let currentLetters = [...currentState.currentWord.letters];
  if (currentLetters[letterSelected] !== '') {
    currentLetters[letterSelected] = '';
  } else if (currentLetters[letterSelected - 1] !== '') {
    currentLetters[letterSelected - 1] = '';
  }

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

function checkWordIsFilled(currentLetters) {
  let isWordFilled = true;
  for (const letter of currentLetters) {
    if (letter === "")
    isWordFilled = false;
  }

  return isWordFilled;
}

function sendWordAction(state) {
  let errorLength;
  const currentState = current(state);
  let currentLetters = [...currentState.currentWord.letters];
  if (!checkWordIsFilled(currentLetters)) {
    errorLength = 'No hay suficientes letras';
  }

  return {
    ...state,    
    error:errorLength,
  }
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    addLetter: addLetterAction,
    selectLetter: selectLetterAction,
    deleteLetter: deleteLetterAction,
    sendWord: sendWordAction
  }
})

export const { addLetter, selectLetter, deleteLetter, sendWord } = keyboardSlice.actions
export default keyboardSlice.reducer