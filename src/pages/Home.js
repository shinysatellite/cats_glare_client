import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';

import LoginForm from '../components/LoginForm';

export default function Home() {
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Typography component="h2" variant="h3">
          Enjoy All Cates
        </Typography>
        <p></p>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}
