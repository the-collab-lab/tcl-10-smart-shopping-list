import React from 'react';
import { NavLink } from 'react-router-dom';

const List = ({ results, setSearchTerm, searchTerm }) => {
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
    </div>
  );
};

export default List;
