function KeyboardLine(props) {
  const {first, second, third, fouth, fifth, sixth, seventh, eighth, nineth, tenth} = props;
  return (
    <div className="keyboard-line">
      <div className="key ">{first}</div>
      <div className="key ">{second}</div>
      <div className="key ">{third}</div>
      <div className="key yellow">{fouth}</div>
      <div className="key ">{fifth}</div>
      <div className="key ">{sixth}</div>
      <div className="key ">{seventh}</div>
      <div className="key grey">{eighth}</div>
      <div className="key ">{nineth}</div>
      <div className="key ">{tenth}</div>
    </div>
  )
}

export default KeyboardLine

