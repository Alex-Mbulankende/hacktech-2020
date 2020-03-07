import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.less';

import logo from '../../assets/logo.svg';

const NavBar = () => {
  return (
    <nav className="navbar-horizontal">
      <NavLink className="title" to="/">
        <img alt="cor" id="logo" src={logo} />
        <span className="heading">CORONALLY</span>
      </NavLink>
      <div className="links">
        <NavLink activeClassName="selected" to="/donate">
          DONATE
        </NavLink>
        <NavLink activeClassName="selected" to="/create">
          CREATE LISTING
        </NavLink>
        <NavLink activeClassName="selected" to="/analytics">
          ANALYTICS
        </NavLink>
        <NavLink activeClassName="selected" to="/profile">
          PROFILE
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
