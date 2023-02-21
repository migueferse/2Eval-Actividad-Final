function PreviousLetter(props) {
  const { value, color }= props;
  return (
    <div className="letter">
      <div className={"slot " + color}>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default PreviousLetter