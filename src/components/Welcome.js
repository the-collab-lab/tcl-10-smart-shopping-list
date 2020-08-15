import React from 'react';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';
import { writeToFirestore } from '../lib/firebase';

const Welcome = ({ setToken }) => {
  const setTokenStorage = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    setToken(token);
    writeToFirestore(token);
  };

  return (
    <div>
      <h1>Welcome to your Smart Shopping list!</h1>
      <Link to="/list" onClick={setTokenStorage}>
        Create New List
      </Link>
      <p>- or -</p>
      <p>Join an existing shopping list by entering a three word token.</p>
    </div>
  );
};

export default Welcome;
