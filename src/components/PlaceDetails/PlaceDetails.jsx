import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

function PlaceDetails({ place }) {
  return (
    <Card elevation={3} sx={{ maxWidth: 345, margin: '20px auto' }}>
      
      <CardMedia
        component="img"
        height="200"
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://imgs.search.brave.com/J_ARjs-AIe3XEzQx1mYOLG5xHQbPd4LUq7V_iz2g88w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA0/NzA0MTE3L3Bob3Rv/L3Jlc3RhdXJhbnQt/cGxhdGVzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NaEZk/Tl9xVmd6b0hvdi1r/Z0Z4MHFXU1cwblpo/dDRsWlYxemluQzNF/YTQ0PQ"
        }
        alt={place.name}
      />
      
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ color: '#2E3B55' }}>
          {place.name}
        </Typography>
        
        {place.ranking && (
          <Typography variant="subtitle1" sx={{ color: '#FF6F61' }}>
            Ranking: {place.ranking}
          </Typography>
        )}
        
        {place.awards && place.awards.length > 0 && (
          <Typography variant="body2" sx={{ color: '#4CAF50' }} gutterBottom>
            Certificates: {place.awards.map(award => award.display_name).join(', ')}
          </Typography>
        )}
        
        {place.address && (
          <Typography variant="body2" sx={{ color: '#757575' }} gutterBottom>
            Address: {place.address}
          </Typography>
        )}
        
        {place.phone && (
          <Typography variant="body2" sx={{ color: '#3F51B5' }} gutterBottom>
            Phone: {place.phone}
          </Typography>
        )}
        
        {place.price && (
          <Typography variant="body2" sx={{ color: '#FF9800' }}>
            Cost: {place.price}
          </Typography>
        )}
      </CardContent>
      
    </Card>
  );
}

export default PlaceDetails;
