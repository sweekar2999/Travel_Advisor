import React, { useState, useRef } from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import { CircularProgress, Typography, Grid, InputLabel, MenuItem, FormControl, Select, Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  padding: '15px',
  maxWidth: '400px',
  margin: '0 auto',
  width: '100%',
  boxSizing: 'border-box',
});

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 100,
  marginBottom: '30px',
}));

const LoadingContainer = styled('div')({
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ListContainer = styled(Grid)(({ theme }) => ({
  height: '75vh',
  overflow: 'auto',
  marginTop: theme.spacing(2),
  maxWidth: '100%',
  padding: '0 20px',
}));

function List({ places, scrollToCard, placeRefs }) { // Accept placeRefs as a prop
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const handleCardRef = (index) => (node) => {
    placeRefs.current[index] = node;
  };

  const handleMarkerClick = (index) => {
    scrollToCard(placeRefs.current[index]);
  };

  return (
    <Container>
      <Typography variant='h5'>Restaurants, Hotels & Attractions around you</Typography>
      <FormControlStyled>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value='restaurants'>Restaurants</MenuItem>
          <MenuItem value='hotels'>Hotels</MenuItem>
          <MenuItem value='attractions'>Attractions</MenuItem>
        </Select>
      </FormControlStyled>
      <FormControlStyled>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControlStyled>
      <ListContainer container spacing={3}>
        {places?.map((place, i) => (
          <Grid2 item xs={12} key={i} ref={handleCardRef(i)}>
            <PlaceDetails place={place} onClick={() => handleMarkerClick(i)} />
          </Grid2>
        ))}
      </ListContainer>
    </Container>
  );
}

export default List;
