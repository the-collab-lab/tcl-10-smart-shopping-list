import React, { useState } from 'react';
import { writeToFirestore } from '../lib/firebase';

const AddItem = () => {
  let [name, setName] = useState('');
  let [frequency, setFrequency] = useState(7);

  function handleSubmitForm(event) {
    event.preventDefault();
    if (name.length > 0) {
      writeToFirestore('put-token-here', {
        name,
        frequency,
        lastPurchaseDate: null,
      });
      alert(`${name} has been successfully added to your list.`);
      setName('');
      setFrequency(7);
    }
  }

  const handleRadioChange = e => {
    setFrequency(parseInt(e.target.value));
  };

  return (
    <form onSubmit={event => handleSubmitForm(event)}>
      <label htmlFor="add-shopping-list-item">Item Name</label>
      <input
        required
        value={name}
        onChange={e => setName(e.target.value)}
        id="add-shopping-list-item"
      />
      <fieldset>
        <legend>How soon will you buy this again?</legend>
        <div>
          <input
            onChange={e => handleRadioChange(e)}
            type="radio"
            id="soon"
            name="soon"
            checked={frequency === 7}
            value={7}
          />
          <label htmlFor="soon">Soon</label>
          <input
            checked={frequency === 14}
            onChange={e => handleRadioChange(e)}
            type="radio"
            id="kind-of-soon"
            name="kind-of-soon"
            value={14}
          />
          <label htmlFor="kind-of-soon">Kind of Soon</label>
          <input
            checked={frequency === 30}
            onChange={e => handleRadioChange(e)}
            type="radio"
            id="not-soon"
            name="not-soon"
            value={30}
          />
          <label htmlFor="not-soon">Not Soon</label>
        </div>
      </fieldset>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
