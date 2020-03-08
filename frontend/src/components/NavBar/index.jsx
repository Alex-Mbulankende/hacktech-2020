import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.less';

import logo from '../../assets/logo.svg';

const NavBar = props => {
  return (
    <nav className="navbar-horizontal">
      <NavLink className="title" to="/">
        <img alt="cor" id="logo" src={logo} />
        <span className="heading">CORONALLY</span>
      </NavLink>
      <div className="links">
        <NavLink activeClassName="selected" to="/donate">
          <div className="popmodal">DONATE</div>
        </NavLink>
        <div className="popmodal" onClick={props.setVis}>
            <div className="text">CREATE LISTING</div>
        </div>
        <div className="popmodal" onClick={props.setAna}>
          <div className="text">ANALYTICS</div>
        </div>
        <NavLink activeClassName="selected" to="/profile">
          <div className="popmodal">PROFILE</div>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
