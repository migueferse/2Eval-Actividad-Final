import { useSelector } from 'react-redux';
import { MESSAGES } from '../config/config';

function ErrorGame() {
  const error = useSelector(state => state.game.game.error);
  const win = useSelector(state => state.game.game.win);
  const lost = useSelector(state => state.game.game.lost);
  return (
    <>
      <div className={error === "" ? "": "message"}>{error}</div>
      <div className={win === true ? "message" : ""}>{win === true ? MESSAGES.win: ""}</div>
      <div className={lost === true ? "message" : ""}>{lost === true ? MESSAGES.lost: ""}</div>
    </>
  )
}

export default ErrorGame