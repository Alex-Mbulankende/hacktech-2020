import React from 'react';
import './style.less';

import planet from '../../assets/planet.png';
import LoginForm from '../LoginForm';

const HomePage = props => {
  return (
    <div className="home-page">
      <div className="sidecircle" />
      <div className="sidecircle" />
      <div className="sidecircle" />



      <div className="center">
        <div className="title">
          <h1>Coronally</h1>
          <p>Bringing community together in crisis</p>
        </div>
      </div>
      <div className="begin-button">
        <h1 onClick={() => props.setMod(true)}>Begin Here</h1>
        <img src={planet} alt="planet" />
      </div>
      <LoginForm mod={props.mod} setMod={props.setMod} />
    </div>
  );
};

export default HomePage;
