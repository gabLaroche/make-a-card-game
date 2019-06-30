import React, { useState, useEffect } from 'react'

const EditCardForm = props => {
    const [card, setCard] = useState(props.currentCard);

    const handleInputChange = event => {
        const { name, value } = event.target;

        setCard({ ...card, [name]: value })
    }

    useEffect(() => {
        setCard(props.currentCard)
    }, [props]);

    return (
        <div className="card" data-card-type={card.type}>
            <form
                onSubmit={event => {
                    event.preventDefault();

                    props.updateCard(card.id, card);
                }}
            >
                <label className="visuallyHidden">Card prompt</label>
                <textarea name="text" value={card.text} maxLength="180" onChange={handleInputChange}>
            </textarea>
                <div>
                    <div>
                        <input type="radio" id="whiteCard" name="type" value="0" checked={card.type === "0"} onChange={handleInputChange} />
                        <label htmlFor="whiteCard">White Card</label>
                    </div>
                    <div>
                        <input type="radio" id="blackCard" name="type" value="1" checked={card.type === "1"} onChange={handleInputChange} />
                        <label htmlFor="blackCard">Black Card</label>
                    </div>
                </div>
                <button>Update card</button>
                <button onClick={() => props.setEditing(false)}>
                    Cancel
                </button>
            </form>
        </div>
    )
};

export default EditCardForm