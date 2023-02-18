import { useSelector } from 'react-redux';
const winMessage = 'Has ganado';
const lostMessage = 'Has perdido';

function ErrorGame() {
  const error = useSelector(state => state.game.game.error);
  const win = useSelector(state => state.game.game.win);
  const lost = useSelector(state => state.game.game.lost);
  return (
    <>
      <div className={error === "" ? "": "message"}>{error}</div>
      <div className={win === true ? "message" : ""}>{win === true ? winMessage: ""}</div>
      <div className={lost === true ? "message" : ""}>{lost === true ? lostMessage: ""}</div>
    </>
  )
}

export default ErrorGame