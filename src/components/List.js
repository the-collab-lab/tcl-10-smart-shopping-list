import React from 'react';
import { NavLink } from 'react-router-dom';

const List = ({ results, setSearchTerm, searchTerm }) => {
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
      <div>
        <form>
          <label htmlFor="searchField">Search</label>
          <input
            onChange={event => setSearchTerm(event.target.value)}
            value={searchTerm}
            id="searchField"
            style={{ margin: 10 }}
          ></input>
          <button
            disabled={searchTerm === ''}
            onClick={() => setSearchTerm('')}
          >
            x
          </button>
        </form>
        <ul style={{ color: 'black' }}>
          {results
            .filter(result =>
              result.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map(result => (
              <li key={result.id}>{result.name}</li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default List;
