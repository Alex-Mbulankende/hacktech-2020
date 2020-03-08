import React from 'react';

import Map from '../Map';
import NavBar from '../NavBar';
import NewItemForm from '../NewItemForm';
import Analytics from '../Analytics';
import './style.less';

const MapPage = props => {
  return (
    <div className="map-page">
      <NavBar setVis={() => props.setVis(true)} />
      <Map />
      <Analytics />
      <NewItemForm vis={props.vis} setVis={() => props.setVis(false)} />
    </div>
  );
};

export default MapPage;
