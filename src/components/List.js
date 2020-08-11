import React from 'react';

const List = props => {
  return (
    <div style={{ background: '#fff', padding: '40px', borderRadius: 5 }}>
      <ul style={{ color: 'black' }}>
        {props.listItems.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
