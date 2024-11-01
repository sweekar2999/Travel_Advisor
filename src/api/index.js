import axios from 'axios';
const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw , ne ) => {
  try {
    const { data: { data } } = await axios.get(url, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': 'a355aefdbbmsh5aa66cfb77fa789p1a3504jsnb15aba3b5d7f',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
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
