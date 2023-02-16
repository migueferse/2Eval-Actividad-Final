import Keyboard from './Keyboard';
import Words from './Words';
import { useDispatch } from 'react-redux';
import { newGameFetch } from '../features/thunks';
import ErrorGame from './ErrorGame';

function Board() {
  const dispatch = useDispatch();
  dispatch(newGameFetch());
  return (
    <div className="board">
      <h1>Adivina la palabra</h1>
      <ErrorGame />
      <Words />
      <Keyboard />
  </div>
  )
}

export default Board