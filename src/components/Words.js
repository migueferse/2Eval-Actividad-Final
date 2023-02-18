import '../styles/letter.css';
import '../styles/words.css';
import Word from './Word';
import Loading from './Loading';
import PreviousWord from './PreviousWord';
import { useSelector } from 'react-redux';

function Words() {
  const previousWords = useSelector(state => state.game.previousWords);
  const isLoading = useSelector(state => state.game.loading);
  return (
    <div className="words">
        {isLoading && <Loading />}
      <div className="container ">
        {previousWords.map((word, index) => <PreviousWord key={index} letters={word.letters} colors={word.colors}/>)}
        {previousWords.length < 6 && <Word />}
      </div>
    </div>

  )
}

export default Words