import React, { useEffect, useState } from 'react';
import './App.css';
import BlackJackTable from './Components/BlackJackTable';
import {useDispatch,  useSelector } from 'react-redux'
import { initData } from './actions'
import {api} from './Components/Helper'



function App() {
  const playerGames = useSelector(state => state.PlayerGames)
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState([])
  
  async function GetUserInitData()
  {
   
     api.get("UserScore/1" ,{
     method: "GET",     
     headers: {
      //  'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },})
       .then(res => {                              
           dispatch(initData(res.data));           
        })
        .catch(error=>{
            console.log(error.message)            
            
        })
  }

 

  useEffect(() => { 
    GetUserInitData();    
  }, [])

  return (
    <div className="App">
      <header className="App-header">
       <h3>BlackJack -:)</h3> 
       <label>Wins: {playerGames.player.wins} Loses: {playerGames.player.loses} Profit: {playerGames.player.profit}$</label>
      </header>
      <h3 className='error-alert'>{errorMessages}</h3>
      <BlackJackTable/>
    </div>
  );
}

export default App;
