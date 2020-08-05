import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function BottomNav(props) {
  const path = props.history.location.pathname;
  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/list"
            className={path === '/list' ? 'selected-view' : null}
          >
            List
          </Link>
        </li>
        <li>
          <Link
            to="/add-item"
            className={path === '/add-item' ? 'selected-view' : null}
          >
            Add an Item
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(BottomNav);
