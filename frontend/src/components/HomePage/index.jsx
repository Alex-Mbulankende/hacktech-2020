import React from 'react';
import './style.less';

import planet from '../../assets/planet.png';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="center">
        <div className="title">
          <h1>Coronally</h1>
          <p>Bringing community together in crisis</p>
        </div>
      </div>
      <div className="begin-button">
        <h1>Begin</h1>
        <img src={planet}/>
      </div>
    </div>
  );
};

export default HomePage;
