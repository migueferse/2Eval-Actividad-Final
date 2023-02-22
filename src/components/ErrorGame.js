import { useSelector } from 'react-redux';

function ErrorGame() {
  const error = useSelector(state => state.game.game.error);
  return (
    <>
      <div className={error === "" ? "": "message"}>{error}</div>
    </>
  )
}

export default ErrorGame