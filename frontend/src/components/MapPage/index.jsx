import React from 'react';

import Map from '../Map';
import NavBar from '../NavBar';
import './style.less';

const MapPage = () => {
  return (
    <div className="map-page">
      <NavBar />
      <Map />
    </div>
  );
};

export default MapPage;
