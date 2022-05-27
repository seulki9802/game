import $ from 'jquery'
import donutImg from '../assets/donut.png'
import vegetableImg from '../assets/vegetable.png'


function Input({ setPage, setName }) {

  function start() {
    var name = $('#name').val()
    if (!name) return alert('닉네임을 입력하세요.')
    if (name.length > 8) return alert('8자 이내로 작성해주세요.')
    setName(name)
    setPage('game')
  }

  let bigDonutCSS = { height: 'calc(5vw + 2vmin)' };
  let bigDonut = <img src={ donutImg } alt="donut" style={ bigDonutCSS }/>;
  let donut = <img src={ donutImg  } alt="donut" />;
  let vegetable = <img src={ vegetableImg  } alt="vegetable" />

  return (
    <div className="Intro item-center">
      <div className='GameName'>
        { bigDonut } Eat donut! { bigDonut }
      </div>

      <p>
        I Love Donut! { donut }<br/>
        I Hate Vegetable! { vegetable }<br/>
        Eat a lot of donuts!{ donut }{ donut }
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
