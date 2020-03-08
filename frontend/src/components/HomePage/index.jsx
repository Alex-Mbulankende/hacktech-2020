import React from 'react';
import './style.less';

import planet from '../../assets/planet.png';
import LoginForm from '../LoginForm';

const HomePage = props => {
  return (
    <div className="home-page">
      <div className="slidestats">
        <h1 style={{opacity: ".25"}}>5 New cases in Italy 1 day ago</h1>
        <h1 style={{opacity: ".5"}}>38 New cases in Seoul 13 hours ago</h1>
        <h1>3 New cases in New York 1 day ago</h1>
      </div>
      <div className="sidenav">
        <h1>HOME</h1>
        <h1>ABOUT</h1>
        <h1>DONATE</h1>
      </div>
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
