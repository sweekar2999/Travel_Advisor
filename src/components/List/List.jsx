import React, { useState } from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import { CircularProgress, Typography, Grid, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const Container = styled('div')({
  padding: '15px',
  maxWidth: '300px', // Reduced width for the main container
  margin: '0 auto',  // Center the container
  width: '100%', // Ensure it takes full width of its parent
  boxSizing: 'border-box', // Include padding in width calculation
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
  maxWidth: '100%',  // Ensure it doesn't exceed container width
  padding: '0 20px', // Optional: add padding for inner spacing
}));

function List() {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const places = [
    { name: 'Cool Place' },
    { name: 'Best Place' },
    { name: 'Good Place' },
    { name: 'Best Stay' },
    { name: 'Cool Place' },
    { name: 'Best Place' },
    { name: 'Good Place' },
    { name: 'Best Stay' },
  ];

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
          <Grid item xs={12} key={i}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </ListContainer>
    </Container>
  );
}

export default List;
