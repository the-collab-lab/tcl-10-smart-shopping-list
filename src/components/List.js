import React from 'react';
import { NavLink } from 'react-router-dom';
import { updatePurchaseDate } from '../lib/firebase.js';

const List = ({ results, token, setDeactivated, deactivated }) => {
  function handleOnCheck(event) {
    setDeactivated([...deactivated, event.target.value]);
    updatePurchaseDate(token, event.target.value);
  }
  return (
    <>
      {results.length === 0 ? (
        <>
          <header>Smart Shopping List</header>
          <p>Your shopping list is currently empty</p>
          <NavLink exact to="/add-item">
            Add Item
          </NavLink>
        </>
      ) : null}
      <ul style={{ color: 'black' }}>
        {results.map(result => {
          return (
            <li key={result.id}>
              <label htmlFor={result.id}></label>
              <input
                type="checkbox"
                /*{ Date.now() - Math.max(...result.purchaseDates) < 86400000 ? disabled : null }*/ name={
                  result.id
                }
                id=""
                value={result.id}
                onClick={handleOnCheck}
              />
              {result.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;
