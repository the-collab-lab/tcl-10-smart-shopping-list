import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../List.module.css';
import { updatePurchaseDate, deleteItem } from '../lib/firebase.js';

const List = ({ results, setSearchTerm, searchTerm, token }) => {
  function handleOnCheck(event, purchaseDates) {
    updatePurchaseDate(token, event.target.value, purchaseDates);
  }

  function checkTime(time) {
    return Date.now() - time <= 86400000; //number of milliseconds equal to 24 hours
  }
  function handleDelete(result) {
    let response = window.confirm(
      `Permanently remove "${result.name}" from your shopping list? 
You cannot undo this action, and this item's purchase history will be lost.`,
    );
    return response ? deleteItem(token, result.id) : null;
  }

  function sortedResults() {
    let soon = [];
    let kindOfSoon = [];
    let notSoon = [];
    let inactive = [];

    results.forEach(result => {
      switch (true) {
        case result.frequency <= 604800000:
          result.timeClass = 'soon';
          soon.push(result);
          break;
        case result.frequency <= 1209600000:
          result.timeClass = 'kind-of-soon';
          kindOfSoon.push(result);
          break;
        case result.frequency <= 2592000000:
          result.timeClass = 'not-soon';
          notSoon.push(result);
          break;
        default:
          result.timeClass = 'inactive';
          inactive.push(result);
          break;
      }
    });

    return [
      ...soon.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      ),
      ...kindOfSoon.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      ),
      ...notSoon.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      ),
      ...inactive.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      ),
    ];
  }

  return (
    <div className={styles['list-container']}>
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
      <div className={styles['list-results-container']}>
        <ul className={styles['ul-list']}>
          {sortedResults()
            .filter(result =>
              result.name
                .toLowerCase()
                .replace(/[\W_]/g, '')
                .includes(searchTerm.toLowerCase()),
            )
            .map(result => {
              const time = Math.max(...result.purchaseDates); //pulls most recent purchase date
              return (
                <li
                  key={result.id}
                  className={
                    checkTime(time)
                      ? `deactivated ${styles[result.timeClass]}`
                      : `${styles[result.timeClass]}`
                  }
                  aria-label={result.timeClass.split('-').join(' ')}
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
                    onClick={e => handleOnCheck(e, result.purchaseDates)}
                    className="checkbox"
                  />
                  {result.name}
                  <button onClick={() => handleDelete(result)}>x</button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default List;
