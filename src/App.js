import React, { useState } from 'react';
import CardGame from './tables/CardGame'
import AddCardForm from './forms/AddCardForm'
import EditCardForm from './forms/EditCardForm'

function App() {
  const cardsData = [
      {id: 1, text: 'Example White Card', type: 0},
      {id: 2, text: 'Example Black Card', type: 1},
  ];

  // type : 0 = white card, 1 : black card
  const initialFormState = {id: null, text: '', type: null};

  const [cards, setCards] = useState(cardsData);
  const [editing, setEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState(initialFormState);

  const editRow = card => {
    setEditing(true);

    setCurrentCard({ id: card.id, text: card.text, type: card.type });
  };

  const addCard = card => {
    card.id = cards.length + 1;
    setCards([...cards, card]);
  };

  const updateCard = (id, updatedCard) => {
    setEditing(false);

    setCards(cards.map(card => (card.id === id ? updatedCard : card)));
  };

  const deleteCard = id => {
    setEditing(false);

    setCards(cards.filter(card => card.id !== id));
  };

  const GameButtons = () => {
    if (cardsData.length > 0) {
      return <div className='buttons-container'>
          <button>Print</button>
          <button>Start over</button>
      </div>;
    }
    return '';
  };
  return (
    <div className="App">
      <h1>Easily make your own card game</h1>
      <p>when making a card you have the option to make white or black card,
        I don’t put any meaning to them, make your game all white cards,
        all black cards, or both. I put two colours so if you wanted to
        make a game like cards against humanity or superfight, you could!
      </p>
      <GameButtons/>
      <div className="container">
        {editing ? (
            <EditCardForm editing={editing}
                          setEditing={setEditing}
                          currentCard={currentCard}
                          updateCard={updateCard}
                          deleteCard={deleteCard} />
        ) : (
            <AddCardForm addCard={addCard} />
        )}
        <CardGame cards={cards} editRow={editRow} />
      </div>
    </div>
  );
}

export default App;
