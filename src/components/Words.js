import { useSelector } from 'react-redux';
import '../styles/letter.css';
import '../styles/words.css';
import Word from './Word';

function Words() {
  const firstLetterState = useSelector(state => state.game.currentWord.letters[0]);
  // const firstLetterColorState = useSelector(state => state.game.currentWord.colors[0]);
  const secondLetterState = useSelector(state => state.game.currentWord.letters[1]);
  const thirdLetterState = useSelector(state => state.game.currentWord.letters[2]);
  const fourthLetterState = useSelector(state => state.game.currentWord.letters[3]);
  const fifthLetterState = useSelector(state => state.game.currentWord.letters[4]);
  const selectedLetterState = useSelector(state => state.game.currentWord.selected);

  return (
    <div className="words">
      <div className="container ">
        <Word first={firstLetterState} second={secondLetterState} third={thirdLetterState} fouth={fourthLetterState} fifth={fifthLetterState} selectedLetter={selectedLetterState} />
      </div>
    </div>

  )
}

export default Words