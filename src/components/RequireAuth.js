import React from 'react';
import { Redirect } from 'react-router-dom';

function RequireAuth({ children }) {
  if (!localStorage.getItem('token')) {
    return <Redirect to="/" />;
  }
  return children;
}

export default RequireAuth;
