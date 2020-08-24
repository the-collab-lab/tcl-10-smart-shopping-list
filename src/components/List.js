import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const List = ({ token, results }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <form>
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
      </form>
      {results.length === 0 ? (
        <>
          <header>Smart Shopping List</header>
          <p>Your shopping list is currently empty</p>
          <NavLink exact to="/add-item">
            Add Item
          </NavLink>
        </>
      ) : null}
      <ul style={{ color: 'black' }}>
        {results
          .filter(result =>
            result.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map(result => (
            <li key={result.id}>{result.name}</li>
          ))}
      </ul>
    </>
  );
};

export default List;
