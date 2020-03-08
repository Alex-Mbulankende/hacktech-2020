import React from 'react';

import NavBar from '../NavBar';
import NewItemForm from '../NewItemForm';
import Analytics from '../Analytics';
import Map from '../../containers/Map';
import './style.less';

const MapPage = props => {
  return (
    <div className="map-page">
      <NavBar
        setVis={() => props.setVis(true)}
        setAna={() => props.setAna(true)}
      />
      <Map />
      <Analytics ana={props.ana} setAna={() => props.setAna(false)} />
      <NewItemForm vis={props.vis} setVis={() => props.setVis(false)} />
    </div>
  );
};

export default MapPage;
