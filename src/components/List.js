import React from 'react';
import { NavLink } from 'react-router-dom';
import { updatePurchaseDate } from '../lib/firebase.js';

const List = ({ results, token, setSearchTerm, searchTerm }) => {
  function handleOnCheck(event) {
    updatePurchaseDate(token, event.target.value);
  }

  function checkTime(time) {
    return Date.now() - time <= 86400000; //number of milliseconds equal to 24 hours
  }

  return (
    <div style={{ height: '50vh', width: '50vw' }}>
      <header>Smart Shopping List</header>
      {results.length === 0 ? (
        <>
          <p>Your shopping list is currently empty</p>
          <NavLink exact to="/add-item">
            Add Item
          </NavLink>
        </>
      ) : (
        <div>
          <div>
            <label htmlFor="searchField" className="sr-only">
              Search
            </label>
          </div>
          <input
            onChange={event => setSearchTerm(event.target.value)}
            autoFocus
            value={searchTerm}
            id="searchField"
            placeholder="Search..."
          ></input>
          <button
            disabled={searchTerm === ''}
            onClick={() => setSearchTerm('')}
          >
            x
          </button>
        </div>
      )}
       <ul>
        {results.map(result => {
          const time = Math.max(...result.purchaseDates); //pulls most recent purchase date
          return (
            <li
              key={result.id}
              className={checkTime(time) ? 'deactivated' : null}
            >
              <label htmlFor={result.id} className="sr-only">
                Mark {result.name} as purchased.
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
    </div>
  );
};

export default List;
