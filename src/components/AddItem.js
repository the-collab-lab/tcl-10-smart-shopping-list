import React from 'react';

const AddItem = props => {
  return (
    <form onSubmit={props.handleSubmitForm}>
      <label
        style={{
          color: 'grey',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
        for="add-shopping-list-item"
      >
        Item Name
      </label>
      <div style={{ display: 'flex' }}>
        <input
          value={props.name}
          onChange={e => props.setName(e.target.value)}
          id="add-shopping-list-item"
        ></input>
        <label
          style={{
            color: 'grey',
            fontSize: '12px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          for="add-shopping-list-item"
        >
          How soon will you buy this again?
        </label>
        <input type="radio" />
        <label>Soon</label>

        <button disabled={props.name.length === 0} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddItem;
