import ErrorGame from './ErrorGame';
import Words from './Words';
import Keyboard from './Keyboard';
import Error from './Error';
import { useDispatch } from 'react-redux';
import { newGameFetch } from '../features/thunks';
import { NAMEGAME } from '../config/config';

function Board() {
  const dispatch = useDispatch();
  dispatch(newGameFetch());
  return (
    <div className="board">
      <h1>{NAMEGAME}</h1>
      <ErrorGame />
      <Words />
      <Keyboard />
      <Error />
  </div>
  )
}

export default Board