import { GET_LISTINGS } from '../actions/types';

const initialState = {
  listings: []
};

const EbayReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return {
        ...state,
        listings: action.listings
      }
    default:
      return state;
  }
};

export default EbayReducer;
