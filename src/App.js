
import React, { useEffect, useState, useRef } from 'react';
import { getPlacesData } from './api';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';
import { CssBaseline, Grid, Grid2 } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const placeRefs = useRef([]); // Add this line to define placeRefs

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (bounds && bounds.sw && bounds.ne) {
      getPlacesData(
        { lat: bounds.sw.lat, lng: bounds.sw.lng },
        { lat: bounds.ne.lat, lng: bounds.ne.lng },
        // Add your types and other parameters
      ).then((data) => setPlaces(data));
    }
  }, [coordinates, bounds]);

  const scrollToCard = (ref) => {
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={6}>
        <List places={places} scrollToCard={scrollToCard} placeRefs={placeRefs} />

        </Grid2>
        <Grid2 item xs={12} md={6}>
          <Map
            coordinates={coordinates}
            places={places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            onMarkerClick={(index) => scrollToCard(placeRefs.current[index])} // Use placeRefs here
          />
        </Grid2>
      </Grid2>
    </>
  );
}

export default App;
