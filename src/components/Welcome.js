import React from 'react';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';

const Welcome = () => {
  const setTokenStorage = () => {
    const token = getToken();
    localStorage.setItem('token', token);
  };
  return (
    <div>
      <h1>Welcome to your Smart Shopping list!</h1>
      <Link exact to="/list" onClick={setTokenStorage}>
        Create New List
      </Link>
      <p>- or -</p>
      <p>Join an existing shopping list by entering a three word token.</p>
    </div>
  );
};

export default Welcome;
