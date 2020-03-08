import React from 'react';

import Map from '../Map';
import NavBar from '../NavBar';
import NewItemForm from '../NewItemForm';
import './style.less';

const MapPage = () => {
  return (
    <div className="map-page">
      <NavBar />
      <Map />
      <NewItemForm />
    </div>
  );
};

export default MapPage;
