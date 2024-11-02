import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mbxGeocoding({ accessToken: "pk.eyJ1Ijoic3dlZWthcjI5OTkiLCJhIjoiY2x6dXM3Y3pzMDA1ODJrcHo4aWRsZmJ4eCJ9.3Mmf0IGxIsMZsTP8-fSFvw"});
export async function getCoordinates(placeName) {
    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: placeName,
          limit: 1,
        })
        .send();
  
      const match = response.body.features[0];
      if (match && match.geometry && match.geometry.coordinates) {
        const [lng, lat] = match.geometry.coordinates;
        return { lat, lng };
      } else {
        throw new Error('No results found for the specified place name');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  }
  