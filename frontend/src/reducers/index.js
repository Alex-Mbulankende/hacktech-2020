import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import EbayReducer from './EbayReducer';
import StatsReducer from './StatsReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    ebay: EbayReducer,
    stats: StatsReducer
  });
