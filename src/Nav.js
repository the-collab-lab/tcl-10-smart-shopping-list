import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

function Nav(props) {
  const path = props.history.location.pathname;
  return (
    <nav>
      <ul>
        <li>
          <Link to="/list" className={path === '/list' ? 'bold' : null}>
            List
          </Link>
        </li>
        <li>
          <Link to="/add-item" className={path === '/add-item' ? 'bold' : null}>
            Add an Item
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Nav);
