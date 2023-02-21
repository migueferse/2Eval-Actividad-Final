import Letter from './Letter';
import { useSelector } from 'react-redux';
function Word() {
  const letters = useSelector(state => state.game.currentWord.letters);
  return (
    <div className="word">
      {letters.map((letter, index) => <Letter key={index} value={letter} position={index}/>)}      
    </div>
  )
}

export default Word