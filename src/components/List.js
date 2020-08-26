import React from 'react';
import { NavLink } from 'react-router-dom';

const List = ({ results, setSearchTerm, searchTerm }) => {
  return (
    <>
      <label htmlFor="searchField">Search</label>
      <br />
      <input
        onChange={event => setSearchTerm(event.target.value)}
        value={searchTerm}
        id="searchField"
      ></input>
      <button disabled={searchTerm === ''} onClick={() => setSearchTerm('')}>
        x
      </button>
      {results.length === 0 ? (
        <>
          <header>Smart Shopping List</header>
          <p>Your shopping list is currently empty</p>
          <NavLink exact to="/add-item">
            Add Item
          </NavLink>
        </>
      ) : (
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
