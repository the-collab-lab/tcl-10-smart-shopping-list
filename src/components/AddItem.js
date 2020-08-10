import React, { useState } from 'react';
import { writeToFirestore } from '../lib/firebase';

const AddItem = () => {
  let [name, setName] = useState('');
  function handleSubmitForm(event) {
    event.preventDefault();
    if (name.length > 0) {
      writeToFirestore('shopping-list', { name });
      setName('');
    }
  }
  return (
    <form onSubmit={handleSubmitForm}>
      <label
        style={{
          color: 'grey',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
        htmlFor="add-shopping-list-item"
      >
        Add Item
      </label>
      <div style={{ display: 'flex' }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          id="add-shopping-list-item"
        ></input>
        <button disabled={name.length === 0} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddItem;
