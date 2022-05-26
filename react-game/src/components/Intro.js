import hamburger from '../assets/hamburger.tiff'
import lettuce from '../assets/lettuce.tiff'


function Input({ setPage }) {

  return (
    <div className="Intro item-center">
      <h2><img src={hamburger} alt="hamburger" /> Eat hamburger! <img src={hamburger} alt="hamburger" /></h2>
      <p>
        우리 아이는 햄버거<img src={hamburger} alt="hamburger" />를 좋아합니다. 햄버거<img src={hamburger} alt="hamburger" />를 많이 먹으세요!
        하지만 상추<img src={lettuce} alt="lettuce" />는 좋아하지 않아요. 상추<img src={lettuce} alt="lettuce" />를 먹으면 시들시들해질 거예요.
        상추<img src={lettuce} alt="lettuce" />를 피해 햄버거<img src={hamburger} alt="hamburger" />를 많이 먹어보세요!
      </p>
      <button onClick={ () => setPage('game') }>
        eat hamburgers!<img src={hamburger} alt="hamburger" />
      </button>
    </div>

  );
}

export default Input;
