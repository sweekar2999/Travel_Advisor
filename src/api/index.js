import axios from 'axios';
import {useState} from 'react';

export const getPlacesData = async (type,sw , ne ) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': 'd00d66e1c9mshb682c5f41f7b180p1821fajsn804230f8e652',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      },
    });
    return data || []; // Ensure it returns an array
  } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data.message}`);
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error:", error.message);
    }
    return []; // Return an empty array on error to handle gracefully in the app
  }
};



