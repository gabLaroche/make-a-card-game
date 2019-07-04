import React, { useState, useEffect } from 'react';
import CardGame from './components/CardGame'
import AddCardForm from './components/AddCardForm'
import EditCardForm from './components/EditCardForm'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

function App() {
  const cardsData = JSON.parse(window.localStorage.getItem('cards')) || [];

  // type : 0 = white card, 1 : black card
  const initialFormState = {id: null, text: '', type: null};

  const [cards, setCards] = useState(cardsData);
  const [editing, setEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState(initialFormState);
  useEffect(() => {
      window.localStorage.setItem('cards', JSON.stringify(cards));
  });

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

  const deleteAllCards = () => {
      setCards(cards.filter(card => card.id === -1));
  };

  const printGame = () => {
      window.print();
  };

  const GameButtons = () => {
    if (cards.length > 0) {
      return <div className='buttons-container'>
          <button onClick={printGame}>Print Game</button>
          <button onClick={openModal} className="btn-destructive">Start over</button>
      </div>;
    }
    return '';
  };

  const openModal = () => {
      confirmAlert({
          message: 'Are you sure you want to start over?',
          buttons: [
              {
                  label: 'Yes',
                  onClick: () => deleteAllCards()
              },
              {
                  label: 'No'
              }
          ]
      })
  };

  return (
    <div className="App">
        <div className="hero">
          <h1>Easily make your own card game</h1>
          <p>when making a card you have the option to make white or black card,
            I don’t put any meaning to them, make your game all white cards,
            all black cards, or both. I put two colours so if you wanted to
            make a game like cards against humanity or superfight, you could!
          </p>
        </div>
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
