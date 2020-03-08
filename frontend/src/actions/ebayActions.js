import { GET_LISTINGS } from './types';

export const getListings = (event) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:3000/magic/listings', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);
      console.log(data);
      dispatch({
        type: GET_LISTINGS,
        listings: data.itemSummaries
      })
      resolve(event);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
};
