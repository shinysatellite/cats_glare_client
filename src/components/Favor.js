import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, CircularProgress,  } from '@material-ui/core';
import { getFavor,} from '../functions';

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
  box: {
    display: "flex",
    padding: 8
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center"
  }
}));

function Favor(props) {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getFavor();
      setData(response.data);
    }
    fetchMyAPI();
  }, []);

  return (
    <>
      <Grid container spacing={3} className={classes.root}>
        {data &&
          data.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Paper className={classes.paper}>
                <img src={item.image} alt={item.title} />
              </Paper>
            </Grid>
          ))}
        {!data && <CircularProgress />}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Favor);
