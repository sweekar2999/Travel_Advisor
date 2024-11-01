import React, { useRef, useEffect, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { styled } from '@mui/material/styles';
import { Paper, Typography, IconButton, Snackbar } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

// Styled Components
const MapContainer = styled('div')({
  height: '91vh',
  width: '100vw',
  maxWidth: '1180px',
  margin: '0 auto',
  padding: '0 20px',
});

const StyledPaper = styled(Paper)({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100px',
});

const ControlsContainer = styled('div')({
  position: 'absolute',
  top: 10,
  left: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

function MapboxMap({ setCoordinates, setBounds, coordinates }) {
  const mapRef = useRef(); // Reference for map control
  const [error, setError] = useState(null); // Error state

  // Zoom control functions
  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

  // Handle potential errors in map loading
  useEffect(() => {
    const handleError = () => {
      setError("There was an error loading the map. Please check your settings or try again.");
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <>
      <MapContainer>
        {/* <Map
          ref={mapRef}
          initialViewState={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            zoom: 14,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="pk.eyJ1Ijoic3dlZWthcjI5OTkiLCJhIjoiY2x6dXM3Y3pzMDA1ODJrcHo4aWRsZmJ4eCJ9.3Mmf0IGxIsMZsTP8-fSFvw"
          onError={() => setError("Mapbox event blocked. Please check your ad blocker or network settings.")}
          noTelemetry
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
           
            setBounds({
              ne:e.marginBounds.ne,
              sw:e.marginBounds.sw
            });
          }}
          
        > */}
          <Map
  ref={mapRef}
  initialViewState={{
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    zoom: 14,
  }}
  style={{ width: '100%', height: '100%' }}
  mapStyle="mapbox://styles/mapbox/streets-v11"
  mapboxAccessToken="pk.eyJ1Ijoic3dlZWthcjI5OTkiLCJhIjoiY2x6dXM3Y3pzMDA1ODJrcHo4aWRsZmJ4eCJ9.3Mmf0IGxIsMZsTP8-fSFvw"
  onError={() => setError("Mapbox event blocked. Please check your ad blocker or network settings.")}
  noTelemetry
  onMove={(e) => {
    // Use e.viewState to get the updated center and bounds
    const { latitude, longitude } = e.viewState;
    const bounds = e.target.getBounds();

    setCoordinates({ lat: latitude, lng: longitude });
    setBounds({
      ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
      sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
    });
  }}
>

          <Marker latitude={coordinates.lat} longitude={coordinates.lng}>
            <StyledPaper>
              <Typography variant="subtitle2">Sample Place</Typography>
            </StyledPaper>
          </Marker>

          {/* Custom Zoom Controls */}
          <ControlsContainer>
            <IconButton onClick={zoomIn} color="primary">
              <Add />
            </IconButton>
            <IconButton onClick={zoomOut} color="primary">
              <Remove />
            </IconButton>
          </ControlsContainer>
        </Map>
      </MapContainer>

      {/* Snackbar for error notifications */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </>
  );
}

export default MapboxMap;
