function Word(props) {
  const {first, second, third, fouth, fifth, firstLetterColor, selectedLetter} = props;
  return (
    <div className="word">
      <div className="letter">
        <div className={`slot ${firstLetterColor ? firstLetterColor : ''} ${selectedLetter === 0 ? 'selected' : null}`}>
          <p>{first}</p>
        </div>
      </div>
      <div className="letter">
        <div className="slot green ">
          <p>{second}</p>
        </div>
      </div>
      <div className="letter">
        <div className="slot grey ">
          <p>{third}</p>
        </div>
      </div>
      <div className="letter">
        <div className="slot grey ">
          <p>{fouth}</p>
        </div>
      </div>
      <div className="letter">
        <div className="slot yellow ">
          <p>{fifth}</p>
        </div>
      </div>
    </div>
  )
}

export default Word