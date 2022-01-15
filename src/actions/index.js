
import ActionTypes from '../actions/Actiontype'
 export const setWins = () => {
  return {
    type: ActionTypes.SET_WINS,
  };
};
export const setLoses = () => {
  return {
    type: ActionTypes.SET_LOSES,   
  };
};
export const initData = (data) => { 
  return {
    type: ActionTypes.INIT_DATA_FROM_SERVER,
    payload:data,
  };
};