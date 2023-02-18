import PreviousLetter from "./PreviousLetter";
function PreviousWord(props) {
  const { letters, colors } = props;
  return (
    <div className="word">
      {letters && letters.map((letter, index) => <PreviousLetter key={index} value={letter} color={colors[index]}/>)}
    </div>
  )

}

export default PreviousWord