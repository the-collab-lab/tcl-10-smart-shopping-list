import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { NavLink } from 'react-router-dom';

const List = ({ token }) => {
  let [results, setResults] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection(token)
      .onSnapshot(function(querySnapshot) {
        let querySnapshotResults = [];
        querySnapshot.forEach(function(doc) {
          const { name } = doc.data();
          const { id } = doc;

          if (name) {
            querySnapshotResults.push({ id, name });
          }
        });
        setResults(querySnapshotResults);
      });

    return unsubscribe;
  }, [token]);

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
