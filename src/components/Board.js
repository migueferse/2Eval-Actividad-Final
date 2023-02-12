import Keyboard from './Keyboard';
import Words from './Words';

function Board() {
  return (
    <div className="board">
      <h1>Adivina la palabra</h1>
      <Words />
      <Keyboard />
  </div>
  )
}

export default Board