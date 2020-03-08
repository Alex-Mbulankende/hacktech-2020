import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import EbayReducer from './EbayReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    ebay: EbayReducer,
  });
