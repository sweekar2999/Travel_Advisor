import React from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import SkeletonLoader from '../Loader/SkeletonLoader'; // Import your preferred loader here
import { Typography, Grid, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
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

const ListContainer = styled(Grid)(({ theme }) => ({
  height: '75vh',
  overflow: 'auto',
  marginTop: theme.spacing(2),
  maxWidth: '100%',
  padding: '0 20px',
}));

function List({ places, scrollToCard, placeRefs, type, setType, rating, setRating, loading }) {

  // Ref handler for each card
  const handleCardRef = (index) => (node) => {
    placeRefs.current[index] = node;
  };

  const handleMarkerClick = (index) => {
    scrollToCard(placeRefs.current[index]);
  };

  return (
    <Container>
      <Typography variant='h5'>Restaurants, Hotels & Attractions around you</Typography>

      {/* Filter Controls */}
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

      {/* Conditional Loader */}
      {loading ? (
        <SkeletonLoader />  // Replace with your preferred loader
      ) : (
        <ListContainer container spacing={3}>
          {places?.map((place, i) => (
            <Grid item xs={12} key={i} ref={handleCardRef(i)}>
              <PlaceDetails place={place} onClick={() => handleMarkerClick(i)} />
            </Grid>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}

export default List;
