import { GET_STATS } from '../actions/types';

const initialState = {
  sanitizers: 0,
  masks: 0,
  camping: 0,
  medicine: 0
};

const StatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        sanitizers: action.sanitizers,
        masks: action.masks,
        camping: action.camping,
        medicine: action.medicine
      }
    default:
      return state;
  }
};

export default StatsReducer;
