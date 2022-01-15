import ActionTypes from '../actions/Actiontype'

const initialState = {
    player: {
        wins: 0,
        loses: 0,
        profit: 0,
    }
}
//REDUCER
const PlayerGames = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {

        case ActionTypes.SET_WINS:
            return {
                ...state,
                player:
                {
                    ...state.player,
                    wins: state.player.wins + 1,
                    profit: state.player.profit + 10,
                },
            };

        case ActionTypes.SET_LOSES:
            return {
                ...state,
                player:
                {
                    ...state.player,
                    loses: state.player.loses + 1,
                    profit: state.player.profit - 10,
                },
            };

        case ActionTypes.INIT_DATA_FROM_SERVER:
            return {
                ...state,
                player:
                {
                    ...state.player,
                        loses: payload.userLoses,
                        profit: payload.userProfit,
                        wins: payload.userwins,
                },
            };
        default:
            return state;
    }
}

export default PlayerGames;


