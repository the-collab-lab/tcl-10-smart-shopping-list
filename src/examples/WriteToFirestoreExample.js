import React, { useState } from 'react';
import { writeToFirestore } from '../lib/firebase';

export default function WriteToFirestoreExample() {
  const [inputValue, setInputValue] = useState('');
  const [docReferenceId, setDocReferenceId] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    let ref = await writeToFirestore('shopping-list', { name: inputValue });
    setDocReferenceId(ref);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          style={{ height: '2em', width: '15em' }}
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        ></input>
        <button type="submit">Add</button>
      </form>
      <pre>{JSON.stringify({ docId: docReferenceId })}</pre>
    </>
  );
}
