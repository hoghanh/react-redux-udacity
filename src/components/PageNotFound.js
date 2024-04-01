import React from 'react';
import { Grid, Button } from '@mui/material';
import NotFound from '../asset/404.png';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item xs={12} sm={2} sm-offset={2}>
        <Link to='/'>
          <Button variant='contained'>Back to home</Button>
        </Link>
      </Grid>
      <Grid item xs={12} sm={8}>
        <img
          srcSet={NotFound}
          src={NotFound}
          alt={'Page Not Found'}
          style={{ maxHeight: '100vh' }}
          loading='lazy'
        />
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
