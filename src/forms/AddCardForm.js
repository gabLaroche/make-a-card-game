import React, { useState } from 'react'

const AddCardForm = props => {
    const initialFormState = { id: null, text: '', type: null };
    const [card, setCard] = useState(initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;

        setCard({ ...card, [name]: value });
    }

    return (
        <div className="card">
            <form
                onSubmit={event => {
                    event.preventDefault();
                    if (!card.text || !card.type) return

                    props.addCard(card);
                    setCard(initialFormState);
                }}>
                <label className="visuallyHidden">Card prompt</label>
                <textarea name="text" value={card.text} onChange={handleInputChange}>
            </textarea>
                <div>
                    <input type="radio" id="whiteCard" name="type" value="0" onChange={handleInputChange} />
                    <label htmlFor="whiteCard">White Card</label>
                    <input type="radio" id="blackCard" name="type" value="1" onChange={handleInputChange} />
                    <label htmlFor="blackCard">Black Card</label>
                </div>
                <button type="reset">Cancel</button>
                <button>Add</button>
            </form>
        </div>
    )
};

export default AddCardForm