import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERRORS } from "../config/config";
const URL = 'https://adivina-palabra.fly.dev';

function handleError(error) {
  throw error;
}

async function getNewGameId() {
  var URLNEW = URL + '/new';
  var options = {
    method: "POST",
  }

  try {
    let response = await fetch(URLNEW,options);
    let data = await response.json();
    if (!data.id) {throw ERRORS.INITIALIZE}
    return data.id;
  } catch (error) {
    handleError(error);
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

async function fetchLettersPosition(gameId, data) {
  let URLCOLOUR = URL + '/guess/'+ gameId;
  let options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  
  try {
    let response = await fetch(URLCOLOUR, options);
    let data = await response.json();
    return data
  } catch (error) {
    handleError(error);
  }
}

async function getLettersPosition(gameData) {
  let letters = gameData.currentLetters;
  let lettersData = letters.map(function(letter, index) {
    return { position: index.toString(), letter: letter };
  });  

  try {
    let lettersPosition = await Promise.all(
      lettersData.map(async (letterData) => {return await fetchLettersPosition(gameData.gameId, letterData)})    
    )

    return lettersPosition;    
  } catch (error) {
    handleError(error);
  }
}

async function checkWord(gameData) {  
  try {
    if (!checkWordIsFilled(gameData.currentLetters)) {
      throw (ERRORS.NOTFIVELETTERS);
    }
    
    let word = gameData.currentLetters.join('')    
    var URLCHECK = URL + '/check/'+ word;
    var options = {
    method: "GET",
    }

    let response = await fetch(URLCHECK, options);
    let data = await response.json();
    if (data.valid === false) {
      throw (ERRORS.WORDNOTINLIST);
    } else {
      return getLettersPosition(gameData);
    } 
  } catch (error) {
    handleError(error);
    
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