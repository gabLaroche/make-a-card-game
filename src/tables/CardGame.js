import React from 'react'

const CardGame = props => (
    <div className='container'>
    {props.cards.length > 0 ? (
                props.cards.map(card => (
                <div className="card" data-card-type={card.type}>
                    <p>
                        {card.text}
                    </p>

                    <button onClick={() => {
                        props.editRow(card)
                    }}>
                        Edit
                    </button>
                </div>
                ))
        ) : (
            <div>
            </div>
        )
    }
    </div>
);

export default CardGame