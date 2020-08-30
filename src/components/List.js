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
      ) : (
        <>
          <label htmlFor="searchField">Search</label>
          <input
            autoFocus
            className="list-search-field"
            onChange={event => setSearchTerm(event.target.value)}
            value={searchTerm}
            id="search-field"
            style={{ margin: 10 }}
          ></input>
          <button
            id="clear-search-field"
            disabled={searchTerm === ''}
            onClick={() => setSearchTerm('')}
          >
            x
          </button>
        </>
      )}
      <ul style={{ color: 'black' }}>
        {results
          .filter(result =>
            result.name
              .toLowerCase()
              .replace(/[\W_]/g, '')
              .includes(searchTerm.toLowerCase()),
          )
          .map(result => (
            <li key={result.id}>{result.name}</li>
          ))}
      </ul>
    </>
  );
};

export default List;
