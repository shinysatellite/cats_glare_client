import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, CircularProgress, Box, Button } from '@material-ui/core';
import { getImage, upVote, downVote } from '../functions';

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

function Vote(props) {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getImage();
      setData(response);
    }
    fetchMyAPI();
  }, []);

  const _upVote = (id, url) => {
    upVote(id, url);
  }

  const _downVote = (id) => {
    console.log(id);
  }

  return (
    <>
      <Grid container spacing={3} className={classes.root}>
        {data &&
          data.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Paper className={classes.paper}>
                <img src={item.url} alt={item.title} />
                <Box
                  component="span"
                  m={1}
                  className={`${classes.spreadBox} ${classes.box}`}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ height: 40 }}
                    onClick={()=> _upVote(item.id, item.url)}
                  >
                    Like it! 
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ height: 40 }}
                    onClick={()=> _downVote(item.id)}
                  >
                    Don't like it  
                  </Button>
                </Box>
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

export default connect(mapStateToProps)(Vote);
