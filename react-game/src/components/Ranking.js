import $ from 'jquery'
import { useState } from 'react';

function Ranking({ setPage, score }) {

  const [ranking, setRanking] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  if(!isUpdate) {
    $.ajax({

      method: 'POST',
      url: '/update',
      data: { score : score }

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
              Your score: { score }
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table>
                {ranking.slice(0, 5).map((ranker, index) => {
                  return <tr key={ index }><td>{ index + 1 }. { ranker.nick }({ ranker.score })</td></tr>
                })}
              </table>
            </td>
            <td>
              {
                ranking.length >= 6 
                ?
                <table>
                  {ranking.slice(5).map((ranker, index) => {
                  return <tr key={ index }><td>{ index + 5 }. { ranker.nick }({ ranker.score })</td></tr>
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

      <button onClick={ () => setPage('intro') }>RESTART!</button>

    </div>
  );
}

export default Ranking;
