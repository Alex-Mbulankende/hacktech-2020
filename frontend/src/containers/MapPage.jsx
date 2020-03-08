import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import MapPage from '../components/MapPage';
import { getListings } from '../actions/ebayActions';

const MapPageContainer = props => {
  useEffect(() => {
    props.getListings();
  }, []);

  const [vis, setVis] = useState(false);
  const [ana, setAna] = useState(false);

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

const mapStateToProps = state => ({
  listings: state.ebay.listings
});

export default connect(mapStateToProps, { getListings })(MapPageContainer);
