import { createSlice, current } from '@reduxjs/toolkit';
import { newGameFetch, checkWordFetch } from './thunks';

const initialState = {
  game: {
    id: null,
    win: false,
    lost: false,
    error: ''
  },
  currentWord:{
    letters: ['','','','',''],
    colors: ['','','','',''],
    selected: 0
  },
  previousWords: [],
  error: '',
  loading: false,
  keyboard: {
    colors: {}
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
  let currentColors = [...currentState.currentWord.colors];
  currentLetters[currentState.currentWord.selected] = currentLetter;

  if (checkWordLenght(currentState.currentWord.selected)) { return };
  let nextSelected = nextLetterSelected(currentLetters); 

  return {
    ...state,
    currentWord:
    {
      letters: currentLetters,
      colors: currentColors,
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

function sendWordAction(state, action) {
  // let errorLength;
  // const currentState = current(state);
  // let currentLetters = [...currentState.currentWord.letters];
  // if (!checkWordIsFilled(currentLetters)) {
  //   errorLength = 'No hay suficientes letras';
  // }
  // console.log('state', state);
  // console.log('action', action);

  // return {
  //   ...state,    
  //   error:errorLength,
  // }
}

function newGamePending(state) {
  console.log('newGamePending');  
}

function newGameFulFilled(state, action) {
  console.log('newGameFulFilled');
  return {
    ...state,
    game: {
       id : action.payload,
       win: state.game.win,
      lost: state.game.lost,
      error: state.game.error
    }
  }
}

function newGameRejected(state, action) {
  console.log('newGameRejected');
  console.log('Error', action.error.message);
  return {
    ...state,
    game: {
      id: state.game.id,
      win: state.game.win,
      lost: state.game.lost,
      error: action.error.message
    },
  }
}

function checkWordPending(state) {
  console.log('chekWordPending');
}

function checkWordFulFilled(state, action) {
  console.log('checkWordFulFilled');
}

function checkWordRejected(state, action) {
  const currentState = current(state);
  let currentLetters = [...currentState.currentWord.letters];
  let currentColors = [...currentState.currentWord.colors];
  return {
      ...state,    
      currentWord:{
        letters: currentLetters,
        colors: currentColors,
        selected: null
      },
      error:action.error.message,
    }
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    addLetter: addLetterAction,
    selectLetter: selectLetterAction,
    deleteLetter: deleteLetterAction,
    // sendWord: sendWordAction
  },
  extraReducers: {
    [newGameFetch.pending]: newGamePending,
    [newGameFetch.fulfilled]: newGameFulFilled,
    [newGameFetch.rejected]: newGameRejected,
    [checkWordFetch.pending]: checkWordPending,
    [checkWordFetch.fulfilled]: checkWordFulFilled,
    [checkWordFetch.rejected]: checkWordRejected,
  }
})

export const { addLetter, selectLetter, deleteLetter } = keyboardSlice.actions
export default keyboardSlice.reducer