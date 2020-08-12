import React, { useState } from 'react';
import { writeToFirestore } from '../lib/firebase';

const AddItem = () => {
  let [name, setName] = useState('');
  let [consistency, setConsistency] = useState('');

  function handleSubmitForm(event) {
    event.preventDefault();
    if (name.length > 0) {
      writeToFirestore('put-token-here', {
        name,
        consistency,
        lastPurchaseDate: null,
      });
      alert(`${name} has been successfully added to your list.`);
      setName('');
    }
  }

  return (
    <form onSubmit={event => handleSubmitForm(event)}>
      <label htmlFor="add-shopping-list-item">Item Name</label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        id="add-shopping-list-item"
      />
      <fieldset>
        <legend>How soon will you buy this again?</legend>
        <div>
          <input
            onChange={e => setConsistency(e.target.value)}
            type="radio"
            id="soon"
            name="consistency"
            value={7}
          />
          <label htmlFor="soon">Soon</label>
          <input
            onChange={e => setConsistency(e.target.value)}
            type="radio"
            id="kind-of-soon"
            name="consistency"
            value={14}
          />
          <label htmlFor="kind-of-soon">Kind of Soon</label>
          <input
            onChange={e => setConsistency(e.target.value)}
            type="radio"
            id="not-soon"
            name="consistency"
            value={30}
          />
          <label htmlFor="not-soon">Not Soon</label>
        </div>
      </fieldset>
      <button
        disabled={name.length === 0 || consistency.length === 0}
        type="submit"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
