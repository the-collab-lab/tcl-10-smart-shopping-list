import React, { useState } from 'react';
import { writeToFirestore } from '../lib/firebase';

const AddItem = ({ token, results }) => {
  let [name, setName] = useState('');
  let [frequency, setFrequency] = useState(604800000);

  function handleSubmitForm(event) {
    event.preventDefault();

    if (
      results.filter(
        result =>
          name.replace(/[\W_]/g, '').toLowerCase() ===
          result.name.replace(/[\W_]/g, '').toLowerCase(),
      ).length
    ) {
      alert(`${name} already exists on your list.`);
    } else {
      writeToFirestore(token, {
        name,
        frequency,
        purchaseDates: [],
      });
      alert(`${name} has been successfully added to your list.`);
      setName('');
      setFrequency(604800000);
    }
  }

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
            onChange={e => setFrequency(parseInt(e.target.value))}
            type="radio"
            id="soon"
            name="frequency"
            value={604800000}
            checked={frequency === 604800000}
          />
          <label htmlFor="soon">Soon</label>
          <input
            onChange={e => setFrequency(parseInt(e.target.value))}
            type="radio"
            id="kind-of-soon"
            name="frequency"
            value={1209600000}
          />
          <label htmlFor="kind-of-soon">Kind of Soon</label>
          <input
            onChange={e => setFrequency(parseInt(e.target.value))}
            type="radio"
            id="not-soon"
            name="frequency"
            value={2592000000}
          />
          <label htmlFor="not-soon">Not Soon</label>
        </div>
      </fieldset>
      <button type="submit" onClick={() => setName(name.trim())}>
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
