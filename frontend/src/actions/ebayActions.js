import { GET_LISTINGS, POST_LISTING } from './types';
import { notification } from 'antd';

export const getListings = (event) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:3000/magic/listings?zip=95131', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);
      console.log('GHOAUHBIABGOUABVOIAN');
      console.log(data);
      dispatch({
        type: GET_LISTINGS,
        masks : data[0],
        handSanitizer: data[1],
        camping : data[2],
        medicine : data[3]
      })
      resolve(event);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
};

export const postListing = (params) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    try {
      const response = await fetch('https://44a050ab.ngrok.io/magic/addItem?' +
      `title=${params.title}&description=${params.description}&price=${params.price}&location=${params.location}&picture_url=${params.picture_url}&categoryID=${params.category}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);
      console.log(data)
      if (data.statusCode == 400) {
        // toast there was a problem
        notification.open({
          message: 'Error',
          description: 'Oops this listing has already been made'
        });
      } else {
        const win = window.open(data.body, "_blank")
      }


      dispatch({
        type: POST_LISTING
      })
      resolve(params);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
}
