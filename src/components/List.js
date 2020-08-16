import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { NavLink } from 'react-router-dom';

const List = ({ token, results }) => {

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
      <ul style={{ color: 'black' }}>
        {results.map(result => {
          return <li key={result.id}>{result.name}</li>;
        })}
      </ul>
    </>
  );
};

export default List;
