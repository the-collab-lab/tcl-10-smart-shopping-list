import React from 'react';
import { NavLink } from 'react-router-dom';
import { updatePurchaseDate } from '../lib/firebase.js';

const List = ({ results, token }) => {
  function handleOnCheck(event) {
    updatePurchaseDate(token, event.target.value);
  }

  function checkTime(time) {
    return Date.now() - time <= 86400000; //number of milliseconds equal to 24 hours
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
      <ul>
        {results.map(result => {
          const time = Math.max(...result.purchaseDates); //pulls most recent purchase date
          return (
            <li
              key={result.id}
              className={checkTime(time) ? 'deactivated' : null}
            >
              <label htmlFor={result.id} className="sr-only">
                {result.name}
              </label>
              <input
                type="checkbox"
                disabled={checkTime(time)}
                defaultChecked={checkTime(time)}
                name={result.id}
                id={result.id}
                value={result.id}
                onClick={handleOnCheck}
                className="checkbox"
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
