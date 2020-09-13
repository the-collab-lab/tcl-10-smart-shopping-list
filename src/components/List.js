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

  function predictedNextPurchase(lastPurchase, frequency) {
    //takes the last purchase date, frequency, and current date and calculates how many days are there until anticipated purchase date
    return Math.round((lastPurchase + frequency - Date.now()) / 86400000);
  }

  function lastPurchaseDate(result) {
    // needs to be connected to itemAdded timestamp from other branch
    //placeholder for addedItem date
    //if there is a purchase date, it's returning the recent purchase date. Otherwise, returning addedDate
    return result.purchaseDates.length > 0
      ? Math.max(...result.purchaseDates)
      : result.addedDate;
  }

  function sortedResults() {
    let active = [];
    let inactive = [];
    results.forEach(result => {
      //pulls out inactive items - identified by having a negative number less than the negative frequency, or has a frequency greater than 30.
      //for example, if an item has a frequency of 7 days, and the anticpated days left is -8, that means it's been 15 days since the last purchase date, and is inactive
      if (
        predictedNextPurchase(lastPurchaseDate(result), result.frequency) <
          -1 * Math.round(result.frequency / 86400000) ||
        Math.round(result.frequency / 86400000) > 30
      ) {
        result.timeClass = 'inactive';
        inactive.push(result);
      } else {
        active.push(result);

        let predictedPurchase = predictedNextPurchase(
          lastPurchaseDate(result),
          result.frequency,
        );

        switch (true) {
          case predictedPurchase <= 7:
            result.timeClass = 'soon';
            break;
          case predictedPurchase <= 14:
            result.timeClass = 'kind-of-soon';
            break;
          case predictedPurchase <= 30:
            result.timeClass = 'not-soon';
            break;
          default:
            result.timeClass = 'inactive'; //everything above else defaults to inactive
            break;
        }
      }
    });
    //sorts active items alphabetically and by next purchase date
    return [
      ...active
        .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1))
        .sort((a, b) =>
          predictedNextPurchase(lastPurchaseDate(a), a.frequency) >
          predictedNextPurchase(lastPurchaseDate(b), b.frequency)
            ? 1
            : -1,
        ),
      //just sorts inactive items alphabetically. It doesn't make as much sense to sort HOW inactive an item is
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
                  className={checkTime(time) ? `deactivated` : null}
                >
                  <span className="container">
                    <label htmlFor={result.id}>
                      {`${result.name} ${predictedNextPurchase(
                        lastPurchaseDate(result),
                        result.frequency,
                      )} ${Math.round(result.frequency / 86400000)}`}
                      <input
                        type="checkbox"
                        disabled={checkTime(time)}
                        defaultChecked={checkTime(time)}
                        name={result.id}
                        id={result.id}
                        value={result.id}
                        onClick={e => handleOnCheck(e, result.purchaseDates)}
                        className="checkbox"
                        aria-label={result.timeClass.split('-').join(' ')}
                      />
                      <span className={`checkmark ${result.timeClass}`}></span>
                    </label>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(result)}
                    >
                      x
                    </button>
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default List;
