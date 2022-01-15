import React from 'react';
import Card from './Card';


const Player = (props) => {

    let { type, cardssum, cards , HitDisabled ,StandDisabled } = props    
   
    // useEffect(() => {
    //     if (cardssum > 21) {
    //         setStandDisabled(true);
    //         setHitDisabled(true);            
    //     } 
    // }, [cardssum]);
    return (
        <div>
            <div className="box">
            <h3>{type} {cardssum === 0 ? null : <span className="index">{cardssum}</span>} </h3>
               
            </div>
           
                       
            <div className='card-grid'>
                {cards && cards.map((c, index) =>                                    
                    <Card key={index} 
                    value={c.cardValue} 
                    id={c.cardId} 
                    HideCard={c.IsHidden} />
                    
                )
                }
            </div>
            
            {type === 'player' ?
                <div>
                    <button onClick={() => props.Hit(0)} disabled={HitDisabled} className='button-player'>hit</button>
                    <button onClick={props.PlayerStand} disabled={StandDisabled} className='button-player'>stand</button>            
                </div>
                : null}
        </div>
    );
};

export default Player;