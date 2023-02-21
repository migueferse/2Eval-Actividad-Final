import { useDispatch, useSelector } from 'react-redux';
import { deleteLetter } from '../features/keyboardReducer';
import { checkWordFetch } from '../features/thunks';
import KeyboardLetter from './KeyboardLetter';
import { LINES } from '../config/config';
import '../styles/keyboard.css';
const deleteStyle = {
  'width': '20px',
  'height': '30px'
}

function Keyboard() {
  const currentLetters = useSelector(state => state.game.currentWord.letters);
  const gameId = useSelector(state => state.game.game.id);
  const dispatch = useDispatch();

  return (
    <div className="keyboard">
      <div className="keyboard-line">
        {LINES.line1.map((letter, index) => <KeyboardLetter key={index} value={letter}/>)}       
      </div>
      <div className="keyboard-line">
        {LINES.line2.map((letter, index) => <KeyboardLetter key={index} value={letter} position={index}/>)}        
      </div>
      <div className="keyboard-line">
        <div className="command" onClick={() => dispatch(checkWordFetch({currentLetters, gameId}))}>↵</div>
          {LINES.line3.map((letter, index) => <KeyboardLetter key={index} value={letter} position={index}/>)}        
        <div className="command"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" aria-hidden="true" style={deleteStyle}  onClick={() => dispatch(deleteLetter())}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z">
          </path>
        </svg></div>
      </div>
    </div>
  )
}

export default Keyboard