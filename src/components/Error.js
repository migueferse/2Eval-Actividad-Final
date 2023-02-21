import { useSelector } from "react-redux";

function Error() {
  const error = useSelector(state => state.game.error);
  return(
    <div className="error">
      <div className={error !== "" ? "overlay": ""}></div>
      <div>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default Error