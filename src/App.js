// App.js
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
  const placeRefs = useRef([]);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  
  

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (bounds && bounds.sw && bounds.ne) {
      setLoading(true);
  
      getPlacesData(
        type,
        { lat: bounds.sw.lat, lng: bounds.sw.lng },
        { lat: bounds.ne.lat, lng: bounds.ne.lng }
      )
        .then((data) => {
          setPlaces(data);
          setFilteredPlaces([]);
          setRating('');
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching places:", error);
          setLoading(false);
        });
    }
  }, [type, bounds]);

  const scrollToCard = (ref) => {
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <CssBaseline />
      <Header setPlaces={setPlaces} setLoading={setLoading} setCoordinates={setCoordinates} />
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={6}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            scrollToCard={scrollToCard}
            placeRefs={placeRefs}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            loading={loading}
          />
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <Map
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            onMarkerClick={(index) => scrollToCard(placeRefs.current[index])}
          
          />
        </Grid2>
      </Grid2>
    </>
  );
}

export default App;
