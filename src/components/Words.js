import '../styles/words.css';
import '../styles/letter.css';
import Word from './Word';
function Words() {
  return (
    <div className="words">
      <div className="container ">
        <Word first={'R'} second={'A'} third={'B'} fouth={'I'} fifth={'A'}/>
        <Word first={'J'} second={'U'} third={'L'} fouth={'A'} fifth={'Y'}/>
        
      </div>
    </div>

  )
}

export default Words