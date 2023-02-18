import { useDispatch, useSelector } from "react-redux";
import { addLetter } from "../features/keyboardReducer";
function KeyboardLetter(props) {
  const { value } = props;  
  const keyboardColors = useSelector(state => state.game.keyboard.colors);
  const dispatch = useDispatch();
  return (
    <div className={'key '+ keyboardColors[value]} onClick={() => dispatch(addLetter(value))}>{value}</div>
  )
}

export default KeyboardLetter