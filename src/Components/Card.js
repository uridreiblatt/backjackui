import React from 'react';
import { Icons } from './Icons';
import './Card.css';

const Card = (props) => {
    let { value ,HideCard } = props;//, id , cardHidden
    const Icon = Icons[value];
    const IconBack = Icons[0];
    
    return (
        <div className='card'>
            <div className={HideCard ? "flipped" : ""}>                  
                <Icon className='front'  alt="Avatar" />
                <IconBack className='back' alt="Avatar" />
            </div>
        </div>
    );
};

export default Card;