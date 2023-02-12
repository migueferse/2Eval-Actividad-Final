import { useSelector } from 'react-redux';
import '../styles/letter.css';
import '../styles/words.css';
import Word from './Word';

function Words() {
  const firstLetterState = useSelector(state => state.game.currentWord.letters[0]);
  const firstLetterColorState = useSelector(state => state.game.currentWord.colors[0]);
  const selectedLetterState = useSelector(state => state.game.currentWord.selected);

  return (
    <div className="words">
      <div className="container ">
        <Word first={firstLetterState} firstLetterColor={firstLetterColorState} second={''} third={''} fouth={''} fifth={''} selectedLetter={selectedLetterState} />
        {/* <Word first={'R'} second={'E'} third={'A'} fouth={'C'} fifth={'T'}/> */}

      </div>
    </div>

  )
}

export default Words