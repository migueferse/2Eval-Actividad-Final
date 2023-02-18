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
  let currentLetters = [...state.currentWord.letters];
  let currentColors = [...state.currentWord.colors];
  return {
    ...state,
    currentWord:
    {
      letters : currentLetters,
      colors: currentColors,
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
  let currentLetters = [...state.currentWord.letters];
  let currentColors = [...state.currentWord.colors];
  currentLetters[state.currentWord.selected] = currentLetter;

  if (checkWordLenght(state.currentWord.selected)) { return };
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
  const letterSelected = state.currentWord.selected;
  let currentLetters = [...state.currentWord.letters];
  let currentColors = [...state.currentWord.colors];
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
      colors: currentColors,
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

function changeLettersPositionToColor(lettersPosition) {
  // let lettersPosition = [
  //   { status: 'in word' },
  //   { status: 'wrong' },
  //   { status: 'in position' },
  //   { status: 'wrong' },
  //   { status: 'in word' }
  // ];
  
  let lettersColors = lettersPosition.map(function(item) {
    switch (item.status) {
      case 'in position':
        return 'green';
      case 'in word':
        return 'yellow';
      default:
        return 'grey';
    }
  });

  return lettersColors
}

function getKeyboardColors(letters, colors) {
  const keyboardColors = letters.reduce((acc, letter, index) => {
    return { ...acc, [letter]: colors[index] };
  }, {});

  return keyboardColors;
    
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
  // TODO quitar el error de palabra no está en la lista, cuando cargue
}

function checkWordFulFilled(state, action) {
  console.log('checkWordFulFilled');
  let currentWord = {};
  let lettersColors = changeLettersPositionToColor(action.payload); 
  let currentLetters = [...state.currentWord.letters];
  let prevWords = [...state.previousWords];
  currentWord.letters = currentLetters;
  currentWord.colors = lettersColors;
  currentWord.selected = null
  prevWords.push(currentWord);
  let stateKeyboardColors = state.keyboard.colors;
  let keyboardColors = getKeyboardColors(currentLetters, lettersColors);
  let totalKeyboardColors = Object.assign({}, stateKeyboardColors, keyboardColors);

  return {
    ...state,
    currentWord:
    {
      letters: ['','','','',''],
      colors: ['','','','',''],
      selected: 0
    },
    previousWords : prevWords,
    keyboard: {
      colors: totalKeyboardColors
    }
  }
}

function checkWordRejected(state, action) {
  const currentState = current(state);
  let currentLetters = [...state.currentWord.letters];
  let currentColors = [...state.currentWord.colors];
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