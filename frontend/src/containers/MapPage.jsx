import React, { useEffect }  from 'react';
import { connect } from 'react-redux';

import MapPage from '../components/MapPage';
import { getListings } from '../actions/ebayActions';

const MapPageContainer = (props) => {
  useEffect(() => {
    props.getListings();
  }, []);

  return (
    <MapPage listings={props.listings} />
  );
};

const mapStateToProps = state => ({
  listings: state.ebay.listings
});

export default connect(
  mapStateToProps,
  { getListings }
)(MapPageContainer);
