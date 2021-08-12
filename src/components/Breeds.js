import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
} from '@material-ui/core';
import { getImage, getBreeds } from '../functions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: '30px',
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));

function Breeds(props) {
  const classes = useStyles();

  const [breeds, setBreeds] = useState();
  const [breed, setBreed] = useState(-1);
  const [data, setData] = useState();

  const handleChange = async (event) => {
    setBreed(event.target.value);
    let response = await getImage(event.target.value);
    console.log(response);
    setData(response);
  };

  useEffect(() => {
    async function fetchBreeds() {
      let response = await getBreeds();
      setBreeds(response);
    }
    fetchBreeds();
  }, []);

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={breed}
        onChange={handleChange}
      >
        <MenuItem value="-1">
          {!breeds ? <CircularProgress /> : <em>select the value</em>}
        </MenuItem>
        {breeds &&
          breeds.map((item, index) => (
            <MenuItem value={item.id} key={index}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
      {breed != -1 && data && (
        <>
          <h1>name : {data[0].breeds[0].name}</h1>
          <p>temperament: {data[0].breeds[0].temperament}</p>
          <p>description: {data[0].breeds[0].description}</p>
          <Grid container spacing={3} className={classes.root}>
            {data &&
              data.map((item, index) => (
                <Grid item xs={4} key={index}>
                  <Paper className={classes.paper}>
                    <img src={item.url} alt={item.title} />
                  </Paper>
                </Grid>
              ))}
            {!data && <CircularProgress />}
          </Grid>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Breeds);
