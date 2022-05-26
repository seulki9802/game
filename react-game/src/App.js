import { useState } from 'react';

import Game from './components/Game'
import Intro from './components/Intro'
import Ranking from './components/Ranking'

import './App.css';

function App() {


  const [score, setScore] = useState(0);
  const [page, setPage] = useState('intro');
  const [name, setName] = useState('');

  return (
    <div className="App">

      <header className="App-header item-center">

        <div className='Game item-center'>
          {
            page === 'intro'
            ? <Intro setPage={ setPage } setName={ setName } />
            : page === 'game'
            ? <Game setPage={ setPage } setScore={ setScore } name={ name } />
            : page === 'ranking'
            ? <Ranking setPage={ setPage } score={ score } name={ name } />
            : null
          }
        </div>

      </header>
      
    </div>
  );
}

export default App;
