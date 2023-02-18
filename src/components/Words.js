import '../styles/letter.css';
import '../styles/words.css';
import Word from './Word';
import PreviousWord from './PreviousWord';
import { useSelector } from 'react-redux';

function Words() {
  const previousWords = useSelector(state => state.game.previousWords)
  return (
    <div className="words">
      <div className="container ">
        {previousWords.map((word, index) => <PreviousWord key={index} letters={word.letters} colors={word.colors}/>)}
        <Word />
      </div>
    </div>

  )
}

export default Words