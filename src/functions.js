import { apiBase, catsApi } from './config';
import http from './http';
import axios from 'axios';

export const getImage = (breed_id = null, limit = 3, size = 'full') => {
  let api = `${catsApi}/v1/images/search?limit=${limit}&size=${size}`;
  if (breed_id) {
    api += `&breed_id=${breed_id}`;
  }
  const result = http
    .get(api)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch(() => {
      console.log('error');
    });
  return result;
};

export const getBreeds = (breed_id = null, limit = 3, size = 'full') => {
  let api = `${catsApi}/v1/breeds`;
  const result = http
    .get(api)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch(() => {
      console.log('error');
    });
  return result;
};

export const upVote = (id, url) => {
  const api = `${apiBase}/api/v1/votes`;
  const result = axios
    .post(api, {id: id, url: url})
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch(() => {
      console.log('error');
    });
  return result;
};


export const getFavor = () => {
    const api = `${apiBase}/api/v1/votes`;
    const result = axios
      .get(api)
      .then((response) => {
        const { data } = response;
        console.log(data)
        return data;
      })
      .catch(() => {
        console.log('error');
      });
    return result;
  };
  