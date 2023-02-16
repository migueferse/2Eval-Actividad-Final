import { createAsyncThunk } from "@reduxjs/toolkit";
const URL = 'https://adivina-palabra.fly.dev';

async function getNewGameId() {
  var URLNEW = URL + '/new';
  var options = {
    method: "POST",
  }

  try {
    let response = await fetch(URLNEW,options);
    if (response.status !== 200) {throw 'Error Initializing game 404'}
    let data = await response.json();
    return data.id;
  } catch (error) {
    throw error;
  }
}

function checkWordIsFilled(letters) {
  let isWordFilled = true;
  for (const letter of letters) {
    if (letter === "")
    isWordFilled = false;
  }

  return isWordFilled;
}

async function getLettersPosition(gameData) {
  var data = {
    'position': '0',
    'letter': 'a'
  }

  var URLCOLOUR = URL + '/guess/'+ gameData.gameId;
  var options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }


  try {
    let response = await fetch(URLCOLOUR, options);
    let data = await response.json();
    console.log(data);
    return data
  } catch (error) {
    throw error;
  }
}

// async function getNamesUnsorted(movementsUrl) {
//   try {
//     let arrayNames = await Promise.all(
//       movementsUrl.map(async (url) => {return await getSpanishName(url)})    
//     )
//     return arrayNames;    
//   } catch (error) {
//     console.log(error);
//   }
// }

async function checkWord(gameData) {
  console.log('Id',gameData.gameId);
  console.log(gameData);
  
  try {
    if (!checkWordIsFilled(gameData.currentLetters)) {
      throw ('No hay suficientes letras');
    }
    
    let word = gameData.currentLetters.join('')    
    var URLCHECK = URL + '/check/'+ word;
    var options = {
    method: "GET",
    }

    let response = await fetch(URLCHECK, options);
    let data = await response.json();
    if (data.valid === false) {
      throw ('La palabra no está en la lista');
    } else {
      getLettersPosition(gameData);
    }


    // return data.valid;
    
  } catch (error) {
    throw error
    
  }
}

const newGameFetch = createAsyncThunk(
  'newGame',
  getNewGameId
)

const checkWordFetch = createAsyncThunk(
  'checkWord',
  checkWord
)

export { newGameFetch, checkWordFetch }