import { GET_STATS } from './types';

export const getStats = (event) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    try {
      const response = await fetch('https://44a050ab.ngrok.io/magic/insight', {
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
        type: GET_STATS,
        sanitizers: data.sanitizer * 100,
        masks: data.masks * 100,
        camping: data.camping * 100,
        medicine: data.medicine * 100
      })
      resolve(event);
    } catch (error) {
      reject(error);
    }
  })
};
