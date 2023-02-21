const ERRORS = {
  'INITIALIZE':'Error Initializing game 404',
  'NOTFIVELETTERS': 'No hay suficientes letras',
  'WORDNOTINLIST': 'La palabra no está en la lista'
};

const LINES = {
  line1 : ['Q','W','E','R','T','Y','U','I','O','P'],
  line2 : ['A','S','D','F','G','H','J','K','L','Ñ'],
  line3 : ['Z','X','C','V','B','N','M']
};

const MESSAGES = {
  win : 'Has ganado',
  lost : 'Has perdido'
};

const NAMEGAME = 'Adivina la palabra';
const LASTPOSITIONLETTERS = 4;

export  { ERRORS, LINES, MESSAGES, NAMEGAME, LASTPOSITIONLETTERS }