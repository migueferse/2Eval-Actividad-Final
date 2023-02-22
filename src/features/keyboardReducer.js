import { createSlice } from '@reduxjs/toolkit';
import { LASTPOSITIONLETTERS } from '../config/config';
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
    } else {
      continue
    }
  }
  return null
}

function addLetterAction(state, action) {
  const currentLetter = action.payload
  let currentLetters = [...state.currentWord.letters];
  let currentColors = [...state.currentWord.colors];
  currentLetters[state.currentWord.selected] = currentLetter;

  if (checkWordLenght(state.currentWord.selected)) { return }
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
  const lastPositionLetters = LASTPOSITIONLETTERS;
  let letterSelected = state.currentWord.selected ? state.currentWord.selected : lastPositionLetters;
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

function changeLettersPositionToColor(lettersPosition) {  
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
  const colorsPriority = {
    green: 3,
    yellow: 2,
    gray: 1
  };
  
  const keyboardColors = letters.reduce((obj, letter, index) => {
    const color = colors[index];
    if (!obj[letter] || colorsPriority[color] > colorsPriority[obj[letter]]) {
      obj[letter] = color;
    }
    return obj;
  }, {});
  
  return keyboardColors;    
}

function checkKeyboardColor(keyboardColor) {
  let keyboardColorOut;
  keyboardColorOut =  keyboardColor === 'green' ? 'green' : 'yellow';

  return keyboardColorOut;
}

function  addlettersKeyboadColors(stateKeyboardColors, keyboardColors) {
  const mixKeyboardColors = (stateKeyboardColors, keyboardColors) => 
  Object.keys({...stateKeyboardColors, ...keyboardColors}).reduce((result, key) => {
    switch (stateKeyboardColors[key]) {
      case 'green':
        result[key] = 'green';
        break;
      case 'yellow':
        result[key] =checkKeyboardColor(keyboardColors[key]);
        break;
      case 'grey':
        result[key] = keyboardColors[key] || 'grey';
        break;
      default:
        result[key] = keyboardColors[key];
        break;
    }

    return result;
  }, {});

  const totalKeyboardColors = mixKeyboardColors(stateKeyboardColors, keyboardColors);
  return totalKeyboardColors;
}

function checkGameWin(keyboardColors) {
  for (const key in keyboardColors) {
    const letter = keyboardColors[key];      
    if (letter !== 'green') {
      return false;      
    } else {
      continue
    }
  }

  return true
}

function checkGameLost(state) {
  let isLost = false;
  if (state.previousWords.length === 5) {
    isLost = true;
  }

  return isLost;
}

function addPreviousWord(words, currentLetters, lettersColors) {
  let prevWords = words;
  let currentWord = {};
  currentWord.letters = currentLetters;
  currentWord.colors = lettersColors;
  currentWord.selected = null;
  prevWords.push(currentWord);
  return prevWords;
}

function newGamePending(state) {
  return {
    ...state,
    loading:true
  }
}

function newGameFulFilled(state, action) {
  return {
    ...state,
    game: {
       id : action.payload,
       win: state.game.win,
      lost: state.game.lost,
      error: state.game.error
    },
    loading:false
  }
}

function newGameRejected(state, action) {
  return {
    ...state,
    game: {
      id: state.game.id,
      win: state.game.win,
      lost: state.game.lost,
      error: action.error.message
    },
    loading:false
  }
}

function checkWordPending(state) {
  return {
    ...state,
    error:'',
    loading:true
  }
}

function checkWordFulFilled(state, action) {
  let stateKbColors = {}
  let lettersColors = changeLettersPositionToColor(action.payload); 
  let currentLetters = [...state.currentWord.letters];
  let previousWords = [...state.previousWords];
  let addedPrevWords = addPreviousWord(previousWords, currentLetters, lettersColors);
  let stateKeyboardColors = Object.assign(stateKbColors, state.keyboard.colors);
  let keyboardColors = getKeyboardColors(currentLetters, lettersColors);
  let totalKeyboardColors = addlettersKeyboadColors(stateKeyboardColors, keyboardColors);
  let isWin = checkGameWin(keyboardColors);
  let isLost = checkGameLost(state, totalKeyboardColors);
  return {
    ...state,
    game: {
      id : state.game.id,
      win: isWin,
      lost: isLost,
      error: state.game.error
    },
    currentWord:
    {
      letters: ['','','','',''],
      colors: ['','','','',''],
      selected: 0
    },
    previousWords : addedPrevWords,
    loading:false,
    keyboard: {
      colors: totalKeyboardColors
    }
  }
}

function checkWordRejected(state, action) {
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
      loading:false
    }
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    addLetter: addLetterAction,
    selectLetter: selectLetterAction,
    deleteLetter: deleteLetterAction,
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