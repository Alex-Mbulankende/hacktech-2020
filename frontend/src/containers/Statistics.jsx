import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Statistics from '../components/Statistics';
import { getStats } from '../actions/statsActions';

const StatsContainer = props => {
  useEffect(() => {
    props.getStats();
  }, []);

  return (
    <Statistics sanitizers={props.sanitizers} masks={props.masks} camping={props.camping} medicine={props.medicine}/>
  );
};

const mapStateToProps = state => ({
  sanitizers: state.stats.sanitizers,
  masks: state.stats.masks,
  camping: state.stats.camping,
  medicine: state.stats.medicine
});

export default connect(mapStateToProps, { getStats })(StatsContainer);
