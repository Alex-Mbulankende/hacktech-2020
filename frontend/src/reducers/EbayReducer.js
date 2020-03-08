import { GET_LISTINGS } from '../actions/types';

const initialState = {
  masks: [],
  handSanitizer: [],
  camping: [],
  medicine: []
};

const EbayReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return {
        ...state,
        masks: action.masks,
        handSanitizer: action.handSanitizer,
        camping: action.camping,
        medicine: action.medicine
      }
    default:
      return state;
  }
};

export default EbayReducer;
