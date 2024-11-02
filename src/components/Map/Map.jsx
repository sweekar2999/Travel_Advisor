import React, { useRef, useEffect, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { styled } from '@mui/material/styles';
import { Rating, Paper, Typography, IconButton, Snackbar } from '@mui/material';
import { Add, LocationOnOutlined, Remove } from '@mui/icons-material';

// Styled Components
const MapContainer = styled('div')({
  height: '91vh',
  width: '100vw',
  maxWidth: '1080px',
  margin: '0 auto',
  padding: '0 20px',
});

const StyledPaper = styled(Paper)({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100px',
  '@media (max-width: 600px)': {
    width: '80px',
  },
});

const ControlsContainer = styled('div')({
  position: 'absolute',
  top: 10,
  left: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

function MapboxMap({ setCoordinates, setBounds, coordinates, places, onMarkerClick, markerRefs}) {
  const mapRef = useRef();
  const [error, setError] = useState(null);

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

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
            const { latitude, longitude } = e.viewState;
            const bounds = e.target.getBounds();

            setCoordinates({ lat: latitude, lng: longitude });
            setBounds({
              ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
              sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
            });
          }}
        >
          {places?.map((place, i) => {
            const lat = Number(place.latitude);
            const lng = Number(place.longitude);
            if (isNaN(lat) || isNaN(lng)) {
              console.warn(`Invalid coordinates for place: ${place.name}, { lat, lng }`);
              return null;
            }

            return (
              <Marker key={i} latitude={lat} longitude={lng}>
                <StyledPaper onClick={() => onMarkerClick(i)}>
                  {window.innerWidth <= 600 ? (
                    <LocationOnOutlined color="primary" fontSize="large" />
                  ) : (
                    <>
                      {place.photo && (
                        <img
                          src={place.photo.images.large.url}
                          alt={place.name}
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                      )}
                      <Typography variant="subtitle2">{place.name}</Typography>
                      <Rating
                        name={`rating-${i}`}
                        value={place.rating || 0}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </>
                  )}
                </StyledPaper>
              
              </Marker>
            );
          })}

          <Marker latitude={coordinates.lat} longitude={coordinates.lng}>
            <StyledPaper>
              <Typography variant="subtitle2">Sample Place</Typography>
            </StyledPaper>
          </Marker>

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