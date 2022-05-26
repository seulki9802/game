import { useState } from 'react';

import Game from './components/Game'
import Intro from './components/Intro'
import Ranking from './components/Ranking'

import './App.css';

function App() {


  const [score, setScore] = useState(0);
  const [page, setPage] = useState('intro');

  return (
    <div className="App">

      <header className="App-header item-center">

        <div className='Game item-center'>
          {
            page === 'intro'
            ? <Intro setPage={ setPage }/>
            : page === 'game'
            ? <Game setPage={ setPage } setScore={ setScore }/>
            : page === 'ranking'
            ? <Ranking setPage={ setPage } score={ score } />
            : null
          }
        </div>

      </header>
      
    </div>
  );
}

export default App;
