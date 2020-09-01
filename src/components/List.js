import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../List.module.css';
import { updatePurchaseDate, updateFirestore } from '../lib/firebase.js';
import { getMean, getStandardDeviation, getZIndex } from '../lib/estimates.js';

// let examplePurchaseDates = [
//   0, 2, 7, 14, 21, 28, 50, 57, 64, 78
// ];

const List = ({ results, setSearchTerm, searchTerm, token }) => {
  async function handleOnCheck(event) {
    debugger;
    let updatedFrequency = 0;

    let foundItem = results.find(result => result.id === event.target.value);

    if (foundItem.purchaseDates.length >= 2) {
      updatedFrequency = calculateFrequency(foundItem.purchaseDates);
    }

    let tasks = [
      () => updatePurchaseDate(token, event.target.value),
      () =>
        updateFirestore(token, foundItem.id, {
          frequency: updatedFrequency,
        }),
    ];

    for (let fn of tasks) {
      await fn();
    }
  }

  function checkTime(time) {
    return Date.now() - time <= 86400000; //number of milliseconds equal to 24 hours
  }

  function calculateFrequency(results) {
    console.log(results);
    const arr = [];
    const newArr = [];
    // // calculate difference between purchase dates
    for (let i = 0; i < results.length - 1; i++) {
      arr.push(Math.abs(Math.floor(results[i + 1] - results[i])));
    }
    console.log(arr);
    // // // calculate mean
    const mean = getMean(arr);

    // // // calculate standard deviation
    const standardDeviation = getStandardDeviation(arr, mean);

    if (standardDeviation === 0) {
      return mean;
    }
    // find z-index for each item in array & remove outliers
    for (let i = 0; i < arr.length; i++) {
      if (getZIndex(i, mean, standardDeviation) < 2) {
        newArr.push(arr[i]);
      }
    }

    return getMean(newArr);
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
