import '../styles/keyboard.css';
import { useSelector, useDispatch } from 'react-redux'
import { addLetter } from '../features/keyboardReducer'
const deleteStyle = {
  'width': '20px',
  'height': '30px'
}
function Keyboard() {
  const keyboardState = useSelector(state => state.keyboardData.pushedLetter)
  console.log(keyboardState);
  const dispatch = useDispatch();
  return (
    <div className="keyboard">
      <div className="keyboard-line">
        <div className="key ">Q</div>
        <div className="key ">W</div>
        <div className="key ">E</div>
        <div className="key yellow">R</div>
        <div className="key ">T</div>
        <div className="key ">Y</div>
        <div className="key ">U</div>
        <div className="key grey">I</div>
        <div className="key ">O</div>
        <div className="key ">P</div>
      </div>
      <div className="keyboard-line">
        <div className="key green">A</div>
        <div className="key ">S</div>
        <div className="key ">D</div>
        <div className="key ">F</div>
        <div className="key ">G</div>
        <div className="key ">H</div>
        <div className="key ">J</div>
        <div className="key ">K</div>
        <div className="key ">L</div>
        <div className="key ">Ñ</div>
      </div>
      <div className="keyboard-line">
        <div className="command">↵</div>
        <div className="key ">Z</div>
        <div className="key ">X</div>
        <div className="key ">C</div>
        <div className="key ">V</div>
        <div className="key grey">B</div>
        <div className="key ">N</div>
        <div className="key ">M</div>
        <div className="command"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" aria-hidden="true" style={deleteStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z">
          </path>
        </svg></div>        
      </div>
    </div>
  )
}

export default Keyboard