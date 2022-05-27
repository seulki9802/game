import $ from 'jquery'
import { useState } from 'react';

function Ranking({ setPage, score, name }) {

  const [ranking, setRanking] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  if(!isUpdate) {
    $.ajax({

      method: 'POST',
      url: '/update',
      data: { score: score, name: name}

    }).done(function(){
  
      $.ajax({

        method: 'post',
        url: '/ranking',

      }).done(function(result){

        setRanking(result)
        setIsUpdate(true);
  
      }).fail(function(xhr, textStatus, errorThrown){
        console.log('ranking fail')
        
      })
  
    }).fail(function(xhr, textStatus, errorThrown){
      console.log('update fail')
    })
  }
  
  return (
    <div className="Ranking item-center">

      <div style={ {display: 'flex'} }>

      <table>
        <thead>
          <tr>
            <th colspan="2">
              Ranking<br/>
              { name }s' Score: { score }
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table>
                {ranking.slice(0, 5).map((ranker, index) => {
                  return <tr key={ index }><td>{ index + 1 }. { ranker.name }({ ranker.score })</td></tr>
                })}
              </table>
            </td>
            <td>
              {
                ranking.length >= 6 
                ?
                <table>
                  {ranking.slice(5).map((ranker, index) => {
                  return <tr key={ index }><td>{ index + 5 }. { ranker.name }({ ranker.score })</td></tr>
                  })}
                </table>
                :
                null
              }

            </td>
          </tr>
        </tbody>
      </table>

      </div>

      <div className='button-group'>
        <button onClick={ () => setPage('game') }>Game Again</button>
        <button onClick={ () => setPage('intro') }>Go Home</button>
      </div>



    </div>
  );
}

export default Ranking;