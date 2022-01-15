import React, { useEffect, useState } from 'react';
import './BlackJackTable.css'
import Player from './Player';
import { Rnd ,PostWins,PostTtatistics} from './Helper';
import { useDispatch ,useSelector } from 'react-redux'
import { setWins, setLoses } from '../actions'

const initialStateCards =
    [
        {
            type: "player",
            cardssum: 0,
            currentcard: 0,
            cards: []
        },
        {
            type: "dealer",
            cardssum: 0,
            currentcard: 0,
            cards: []
        }
    ]

const BlackJackTable = (props) => {
    const playerGames = useSelector(state => state.PlayerGames)
    const dispatch = useDispatch();
    const [myplayers, setmyplayers] = useState(initialStateCards);
    const [newGamedisable, setneGamedisable] = useState(false);
    const [playerStand, setplayerStand] = useState(false);
    const [dealCard, setdealCard] = useState();
    const [UserStatus, setUserStatus] = useState("Lets play");
    const [StandDisabled, setStandDisabled] = useState(true);
    const [HitDisabled, setHitDisabled] = useState(true);


    function PlayerStand() {
        setHitDisabled(true);
        setplayerStand(true);
        setStandDisabled(true);
        let hiddenValue  = myplayers[1].cards[1].cardValue > 10 ? 10 : myplayers[1].cards[1].cardValue 
        hiddenValue = hiddenValue === 1 ? 11 : hiddenValue
       
        setmyplayers(
            state => {
                
                const stateCopy = [...state]

                stateCopy[1] = {
                    ...stateCopy[1],
                    cardssum: state[1].cardssum + hiddenValue
                }

                stateCopy[1].cards[1] = {
                    
                    ...stateCopy[1].cards[1],
                    IsHidden: false,
                    actualCardValue: hiddenValue
                    


                }
                return stateCopy
            }
        );

        //setTimeout(function () { dealNewCards(1) }, 2000);



    }




    function Hit(id) { dealNewCards(id) }

    function StopGame() {
        setneGamedisable(false);
        setHitDisabled(true);
        setStandDisabled(true);
        
       
        PostTtatistics(...myplayers);


        
    }
    function CheckWinner() {
        if (myplayers[0].cardssum > 21) {
            setUserStatus("Sorry U lose busted");
            dispatch(setLoses());
            StopGame();
        }
        else if (myplayers[1].cardssum > 21) {
            setUserStatus(" congratulation U win Dealer Busted");
            dispatch(setWins());
            StopGame();
        }
        else if (playerStand) {
            if (myplayers[1].cardssum >= 16) {
                if (myplayers[0].cardssum > myplayers[1].cardssum) {
                    setUserStatus(" congratulation U win");
                    dispatch(setWins());
                }
                else if (myplayers[0].cardssum < myplayers[1].cardssum) {
                    setUserStatus("Sorry U lose");
                    dispatch(setLoses());
                }
                else { //draw
                    setUserStatus("Draw");

                }
                StopGame();
            }
            else {    
                    setTimeout(function () { dealNewCards(1) }, 2000);          
                    //dealNewCards(1);
            }
        }
    }
    function calcAces(playerId , actualCardValue) 
    {           
        let aceCount = 0;
        let tempCardsSum = actualCardValue;
        let cardsSum = myplayers[playerId].cardssum + actualCardValue;
        if ( cardsSum > 21 )
        {            
            myplayers[playerId].cards.forEach(c =>{                   
                if (c.cardValue === 1) {
                    aceCount = aceCount + 1;
                }
                tempCardsSum = tempCardsSum + c.actualCardValue;                
            })            
        }
          for(var i = 0 ; i < aceCount ; i++)
        {
            tempCardsSum = tempCardsSum - 10;
            if (tempCardsSum < 22 ) 
            {
                cardsSum = tempCardsSum;
                break;
            }
        }               
        return cardsSum;
    }
    

    function dealNewCards(playerId) {
        let tempcardValue =  Rnd();
        

        let IsHidden = false; 
        let actualCardValue = tempcardValue > 10 ? 10 : tempcardValue;
        actualCardValue = actualCardValue === 1 ? 11 : actualCardValue;
        if (playerId === 1 && myplayers[1].cards.length === 1) 
        {
            IsHidden = true;
            actualCardValue = 0;
        }
        let CurrentSum  = calcAces(playerId, actualCardValue);
               
        
        let newCard = { cardValue: tempcardValue, actualCardValue: actualCardValue, cardId: dealCard, IsHidden: IsHidden }      
        setmyplayers(
            state => {
                const stateCopy = [...state]

                stateCopy[playerId] = {
                    ...stateCopy[playerId],
                    cards: [...state[playerId].cards, newCard],
                    //cardssum: state[playerId].cardssum + tempactualCardValue
                    cardssum: CurrentSum
                }
                return stateCopy
            }
        );



    }
    useEffect(() => {
        CheckWinner();       
    }, [myplayers]);

    useEffect(() => {
        if (dealCard < 4) {
            dealNewCards(dealCard % 2);
            setTimeout(() => setdealCard(dealCard + 1), 700);
            if (dealCard === 3) {
                setHitDisabled(false);
                setStandDisabled(false);
            }
        }

    }, [dealCard]);


   

    //
    function NewGame(e) {
        let tmpplayerGames = playerGames;
        console.log(tmpplayerGames);
        PostWins(tmpplayerGames);
        setUserStatus("Playing....");
        setplayerStand(false);
        setHitDisabled(true);
        setStandDisabled(true);
        setmyplayers(initialStateCards);
        setneGamedisable(true);
        setdealCard(0);
    }
    return (
        <div className='BlackJackTable'>
            <button className='button' disabled={newGamedisable} onClick={NewGame}>New Game</button>
            <h3 className=''>{UserStatus}</h3>
            <div className='players-Display'>
                {myplayers.map((p, index) =>
                    <div key={index} className='single-Palyer'>
                        <Player key={index}
                            type={p.type}
                            cardssum={p.cardssum}
                            cards={p.cards}
                            PlayerStand={PlayerStand}
                            dealNewCards={dealNewCards}
                            StandDisabled={StandDisabled}
                            HitDisabled={HitDisabled}
                            Hit={Hit}></Player>
                    </div>
                )
                }
            </div>



        </div>
    );
};

export default BlackJackTable;