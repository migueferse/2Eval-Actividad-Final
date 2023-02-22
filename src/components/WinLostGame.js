import { MESSAGES } from "../config/config";
import { useSelector } from "react-redux";
function WinLostGame() {
  
  const win = useSelector(state => state.game.game.win);
  const lost = useSelector(state => state.game.game.lost);

  return (
    <>
      <div className={win === true ? "message" : ""}>{win === true ? MESSAGES.win: ""}</div>
      <div className={lost === true ? "message" : ""}>{lost === true ? MESSAGES.lost: ""}</div>
    </>
  )
  
}

export default WinLostGame