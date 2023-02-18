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

function  addlettersKeyboadColors(stateKeyboardColors, keyboardColors) {
  // console.log('stateKeyboardColors', stateKeyboardColors);
  // console.log('keyboardColors', keyboardColors)
  // if (Object.keys(stateKeyboardColors).length === 0) {
  //   return Object.assign({}, stateKeyboardColors, keyboardColors);    
  // } else {
  //   for (const key in stateKeyboardColors) {
  //       const element = stateKeyboardColors[key];
  //       console.log(key);  
  //   }
  // }

  const mixKeyboardColors = (stateKeyboardColors, keyboardColors) => 
  Object.keys({...stateKeyboardColors, ...keyboardColors}).reduce((result, key) => {
    switch (stateKeyboardColors[key]) {
      case 'green':
        result[key] = 'green';
        break;
      case 'yellow':
        if (keyboardColors[key] === 'green') {result[key] = 'green'; break}
        result[key] = 'yellow';
        break;
      case 'grey':
        result[key] = keyboardColors[key] || 'grey';
        break;
      default:
        result[key] = keyboardColors[key];
        break;
    }
    console.log('result',result);
    return result;
    
    // if (stateKeyboardColors[key] === 'green') {
    //   result[key] = 'green';
    // } else if (stateKeyboardColors[key] === 'yellow') {
    //   result[key] = 'yellow';
    // } else if (stateKeyboardColors[key] === 'grey') {
    //   result[key] = keyboardColors[key] || 'grey';
    // } else {
    //   result[key] = keyboardColors[key];
    // }
    // return result;
  }, {});

const totalKeyboardColors = mixKeyboardColors(stateKeyboardColors, keyboardColors);
console.log(totalKeyboardColors);
return totalKeyboardColors;


  // let lettersColors = lettersPosition.map(function(item) {
  //   switch (item.status) {
  //     case 'in position':
  //       return 'green';
  //     case 'in word':
  //       return 'yellow';
  //     default:
  //       return 'grey';
  //   }
  // });
}

function checkGameWin(totalKeyboardColors) {
  let isWin = false;

  for (const key in totalKeyboardColors) {
    const letter = totalKeyboardColors[key];      
    if (letter === 'green') {
      return isWin = true;      
    } else {
      continue
    }
  }

  return isWin
}

function checkGameLost(state) {
  let isLost = false;
  if (state.previousWords.length === 5) {
    isLost = true;
  }

  return isLost;
}

function newGamePending(state) {
  console.log('newGamePending');
  return {
    ...state,
    loading:true
  }

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
    },
    loading:false
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
    loading:false
  }
}

function checkWordPending(state) {
  console.log('chekWordPending');
  return {
    ...state,
    error:'',
    loading:true
  }
}

function checkWordFulFilled(state, action) {
  console.log('checkWordFulFilled');
  const currentState = current(state);
  let currentWord = {};
  let stateKbColors = {}
  let lettersColors = changeLettersPositionToColor(action.payload); 
  let currentLetters = [...state.currentWord.letters];
  let prevWords = [...state.previousWords];
  currentWord.letters = currentLetters;
  currentWord.colors = lettersColors;
  currentWord.selected = null
  prevWords.push(currentWord);
  let stateKeyboardColors = Object.assign(stateKbColors, state.keyboard.colors);
  let keyboardColors = getKeyboardColors(currentLetters, lettersColors);
  // let totalKeyboardColors = Object.assign({}, stateKeyboardColors, keyboardColors);
  let totalKeyboardColors = addlettersKeyboadColors(stateKeyboardColors, keyboardColors);
  let isWin = checkGameWin(totalKeyboardColors);
  let isLost = checkGameLost(state, totalKeyboardColors);
  // console.log('totalKeyboard', totalKeyboardColors);
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
    previousWords : prevWords,
    loading:false,
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