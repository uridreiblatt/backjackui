import axios from 'axios'



export const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
})

export function Rnd() {
 
  return Math.floor(Math.random() * 13) + 1;
}


export async function PostTtatistics(statisticsData) {
  let DataJson = JSON.stringify(statisticsData).replace("\"","'");
  let statisticsDataJson =  {
    "info": DataJson
  }
  await api.post("/Statistics", statisticsDataJson)
    .then(res => {
      console.log("statisticsData Saved on server");
    })
    .catch(error => {
      console.log("Cannot add statisticsData. Server error!");

    })

}
export async function PostWins(playerGames) {
  //const playerGames = useSelector(state => state.PlayerGames)
  console.log(playerGames);
  let UserState = {
    "id": 1,
    "userId": 1,
    "userwins": playerGames.player.wins,
    "userLoses": playerGames.player.loses,
    "userProfit": playerGames.player.profit
  }
  await api.post("/UserScore", UserState)
    .then(res => {
      console.log("UserState Saved on server");
    })
    .catch(error => {
      console.log("Cannot add UserState. Server error!");

    })
}
