import axios from 'axios';
const url = ;

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
        'x-rapidapi-key': '',
        'x-rapidapi-host': '',
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
