import React from 'react';
import { NavLink } from 'react-router-dom';

function BottomNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/list" activeClassName="selected-view">
            List
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/add-item" activeClassName="selected-view">
            Add Item
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNav;
