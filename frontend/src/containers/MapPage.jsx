import React, { useState } from 'react';

import MapPage from '../components/MapPage';
import { getListings } from '../actions/ebayActions';

const MapPageContainer = props => {

  const [vis, setVis] = useState(false);
  const [ana, setAna] = useState(true);

  return (
    <MapPage
      listings={props.listings}
      ana={ana}
      setAna={setAna}
      setVis={setVis}
      vis={vis}
    />
  );
};

export default MapPageContainer;
