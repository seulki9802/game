import $ from 'jquery'
import donut from '../assets/donut.png'
import vegetable from '../assets/vegetable.png'


function Input({ setPage, setName }) {

  function start() {
    var name = $('#name').val()
    if (!name) return alert('닉네임을 입력하세요.')
    setName(name)
    setPage('game')
  }

  return (
    <div className="Intro item-center">
      <h2><img src={donut} alt="donut" /> Eat donut! <img src={donut} alt="donut" /></h2>

      <p>
        I Love Donut! <img src={donut} alt="donut" /><br/>
        I Hate Vegetable! <img src={vegetable} alt="vegetable" /><br/>
        Eat a lot of donuts!
      </p>

      <div>
        <input id='name' placeholder='Input your name'/>
        <button onClick={ start }>
          start!
        </button>
      </div>
    </div>

  );
}

export default Input;
