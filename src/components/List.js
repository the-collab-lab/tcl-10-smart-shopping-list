import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';

const List = () => {
  let [results, setResults] = useState([]);
  useEffect(() => {
    db.collection('shopping-list').onSnapshot(function(querySnapshot) {
      let querySnapshotResults = [];
      querySnapshot.forEach(function(doc) {
        const { name } = doc.data();
        const { id } = doc;
        querySnapshotResults.push({ id, name });
      });
      setResults(querySnapshotResults);
    });
  }, []);

  return (
    <ul style={{ color: 'black' }}>
      {results.map(result => {
        return <li key={result.id}>{result.name}</li>;
      })}
    </ul>
  );
};

export default List;
