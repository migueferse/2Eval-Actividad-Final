import { useDispatch, useSelector } from "react-redux";
import { selectLetter } from "../features/keyboardReducer";
function Letter(props) {
  const dispatch = useDispatch();
  const {value, position} = props;
  const selectedLetter = useSelector(state => state.game.currentWord.selected);
  let isSelected = selectedLetter === position ? 'selected' :''
  return (
    <div className="letter">
      <div className={"slot " + isSelected} onClick={() => dispatch(selectLetter(position))}>
        <p>{value}</p>
      </div>
    </div>
  )

}

export default Letter