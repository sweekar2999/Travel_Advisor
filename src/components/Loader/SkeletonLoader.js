import React from 'react';
import { Skeleton, Grid } from '@mui/material';

function SkeletonLoader() {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(5)).map((_, index) => (
        <Grid item xs={12} key={index}>
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
        </Grid>
      ))}
    </Grid>
  );
}

export default SkeletonLoader;
