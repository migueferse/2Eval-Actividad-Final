import { useDispatch, useSelector } from 'react-redux';
import { addLetter, deleteLetter } from '../features/keyboardReducer';
import { checkWordFetch } from '../features/thunks';
import '../styles/keyboard.css';
const deleteStyle = {
  'width': '20px',
  'height': '30px'
}

function Keyboard() {
  const currentLetters = useSelector(state => state.game.currentWord.letters);
  const gameId = useSelector(state => state.game.game.id);
  console.log('Component',currentLetters);
  const dispatch = useDispatch();
  
  return (
    <div className="keyboard">
      <div className="keyboard-line">
        <div className="key " onClick={() => dispatch(addLetter('Q'))}>Q</div>
        <div className="key " onClick={() => dispatch(addLetter('W'))}>W</div>
        <div className="key " onClick={() => dispatch(addLetter('E'))}>E</div>
        <div className="key " onClick={() => dispatch(addLetter('R'))}>R</div>
        <div className="key " onClick={() => dispatch(addLetter('T'))}>T</div>
        <div className="key " onClick={() => dispatch(addLetter('Y'))}>Y</div>
        <div className="key " onClick={() => dispatch(addLetter('U'))}>U</div>
        <div className="key " onClick={() => dispatch(addLetter('I'))}>I</div>
        <div className="key " onClick={() => dispatch(addLetter('O'))}>O</div>
        <div className="key " onClick={() => dispatch(addLetter('P'))}>P</div>
      </div>
      <div className="keyboard-line">
        <div className="key " onClick={() => dispatch(addLetter('A'))}>A</div>
        <div className="key " onClick={() => dispatch(addLetter('S'))}>S</div>
        <div className="key " onClick={() => dispatch(addLetter('D'))}>D</div>
        <div className="key " onClick={() => dispatch(addLetter('F'))}>F</div>
        <div className="key " onClick={() => dispatch(addLetter('G'))}>G</div>
        <div className="key " onClick={() => dispatch(addLetter('H'))}>H</div>
        <div className="key " onClick={() => dispatch(addLetter('J'))}>J</div>
        <div className="key " onClick={() => dispatch(addLetter('K'))}>K</div>
        <div className="key " onClick={() => dispatch(addLetter('L'))}>L</div>
        <div className="key " onClick={() => dispatch(addLetter('Ñ'))}>Ñ</div>
      </div>
      <div className="keyboard-line">
        <div className="command" onClick={() => dispatch(checkWordFetch({currentLetters, gameId}))}>↵</div>
        <div className="key " onClick={() => dispatch(addLetter('Z'))}>Z</div>
        <div className="key " onClick={() => dispatch(addLetter('X'))}>X</div>
        <div className="key " onClick={() => dispatch(addLetter('C'))}>C</div>
        <div className="key " onClick={() => dispatch(addLetter('V'))}>V</div>
        <div className="key " onClick={() => dispatch(addLetter('B'))}>B</div>
        <div className="key " onClick={() => dispatch(addLetter('N'))}>N</div>
        <div className="key " onClick={() => dispatch(addLetter('M'))}>M</div>
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
// {`slot ${selectedLetter === 0 ? 'selected' : null}`}
export default Keyboard