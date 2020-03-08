import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map';
import { getListings } from '../actions/ebayActions';

const MapContainer = props => {
  useEffect(() => {
    props.getListings();
  }, []);

  return (
    <Map masks={props.masks} handSanitizer={props.handSanitizer} camping={props.camping} medicine={props.medicine}/>
  );
};

const mapStateToProps = state => ({
  masks: state.ebay.masks,
  handSanitizer: state.ebay.handSanitizer,
  camping: state.ebay.camping,
  medicine: state.ebay.medicine
});

export default connect(mapStateToProps, { getListings })(MapContainer);
