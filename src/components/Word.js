import Letter from './Letter';
import { selectLetter } from '../features/keyboardReducer';
import { useDispatch, useSelector } from 'react-redux';
function Word() {
  // const {first, second, third, fouth, fifth, firstLetterColor, selectedLetter} = props;
  // const dispatch = useDispatch();
  const letters = useSelector(state => state.game.currentWord.letters);
  // const selectedLetter = useSelector(state => state.game.currentWord.selected);
  // console.log('SelectedL', selectedLetter);
  // console.log('En Word', letters);
  return (
    <div className="word">
      {letters.map((letter, index) => <Letter key={index} value={letter} position={index}/>)}
      
    </div>
    // <div className="word">
    //   <div className="letter">
    //     {/* <div className={`slot ${firstLetterColor ? firstLetterColor : ''} ${selectedLetter === 0 ? 'selected' : null}`}> */}
    //     <div className={`slot ${selectedLetter === 0 ? 'selected' : null}`} onClick={() => dispatch(selectLetter(0))}>
    //       <p>{first}</p>
    //     </div>
    //   </div>
    //   <div className="letter">
    //     <div className={`slot ${selectedLetter === 1 ? 'selected' : null}`} onClick={() => dispatch(selectLetter(1))}>
    //       <p>{second}</p>
    //     </div>
    //   </div>
    //   <div className="letter">
    //     <div className={`slot ${selectedLetter === 2 ? 'selected' : null}`} onClick={() => dispatch(selectLetter(2))}>
    //       <p>{third}</p>
    //     </div>
    //   </div>
    //   <div className="letter">
    //     <div className={`slot ${selectedLetter === 3 ? 'selected' : null}`} onClick={() => dispatch(selectLetter(3))}>
    //       <p>{fouth}</p>
    //     </div>
    //   </div>
    //   <div className="letter">
    //     <div className={`slot ${selectedLetter === 4 ? 'selected' : null}`} onClick={() => dispatch(selectLetter(4))}>
    //       <p>{fifth}</p>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Word