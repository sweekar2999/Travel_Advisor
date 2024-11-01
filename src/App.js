import React, { useEffect, useState } from 'react';
import { getPlacesData } from './api';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';
import { CssBaseline, Grid } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);

  // Get the user’s current location on initial load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  // Fetch places data whenever bounds are updated and defined
  useEffect(() => {
    console.log("Current Coorfinates:",coordinates);
    console.log("Current bounds:", bounds); // Log the bounds object
    if (bounds && bounds.sw && bounds.ne) {
      console.log("Bounds sent to API:", bounds);
      
      getPlacesData(
        { lat: bounds.sw.lat, lng: bounds.sw.lng },
        { lat: bounds.ne.lat, lng: bounds.ne.lng }
      )
        .then((data) => {
          console.log("Fetched Places Data:", data);
          setPlaces(data);
        })
        .catch((error) => console.error("Error fetching places data:", error));
    }
  }, [bounds]);
  
  
  
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
