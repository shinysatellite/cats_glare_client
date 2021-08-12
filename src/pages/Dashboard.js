import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container, Tab, Tabs, Paper } from '@material-ui/core';

import { apiBase } from '../config';
import http from '../http';
import Vote from '../components/Vote';
import Breeds from '../components/Breeds';
import Favor from '../components/Favor';


export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  // // API Path
  // const api = `${apiBase}/api/v1/todo`;

  // // Effect runs once on mount.
  // useEffect(() => {
  //   http
  //     .get(`${api}?status=open`)
  //     .then((response) => {
  //       const { data } = response.data;
  //       setData(data);
  //       setError(false);
  //     })
  //     .catch(() => {
  //       setError('Unable to fetch data.');
  //     });
  // }, [api]);

  return (
    <>
      <Helmet>
        <title>Dashboard | Laravel Material</title>
      </Helmet>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Vote" />
        <Tab label="Breeds" />
        <Tab label="My Favourite" />
      </Tabs>
      {
        value === 0 && <Vote />
      }
      {
        value === 1 && <Breeds />
      }
      {
        value === 2 && <Favor />
      }
    </>
  );
}
