import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent = () => {
  return (
    <div>
      <CircularProgress />

      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
