import React from 'react'
import { Typography } from '@mui/material'
function PlaceDetails({place}) {
  return (
    <div>
      <Typography variant='subtitle1' gutterBottom>{place.name}</Typography>
    </div>
  )
}

export default PlaceDetails