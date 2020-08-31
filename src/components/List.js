import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../List.module.css';
import { updatePurchaseDate, updateFirestore } from '../lib/firebase.js';

let examplePurchaseDates = [
  1598892792083,
  1598287992083,
  1597078392083,
  1594486392083,
  1594313592083,
];

const List = ({ results, setSearchTerm, searchTerm, token }) => {
  function handleOnCheck(event) {
    // updatePurchaseDate(token, event.target.value)
    //   .then(() => {
    console.log(calculateFrequency(examplePurchaseDates));
    // updateFirestore(token, event.target.value),
    // });
  }

  function checkTime(time) {
    return Date.now() - time <= 86400000; //number of milliseconds equal to 24 hours
  }

  function calculateFrequency(results) {
    const arr = [];

    for (let i = 0; i < results.length - 1; i++) {
      arr.push(Math.abs(Math.floor(results[i + 1] - results[i])));
    }

    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;

    const standardDeviation = Math.sqrt(
      arr
        .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
        .reduce((acc, val) => acc + val, 0) /
        (arr.length - 1),
    );
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
          {results
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
    </div>
  );
};

export default List;
