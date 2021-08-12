import axios from 'axios';
import store from './store';
import {api_key} from './config'

import * as actions from './store/actions';

const token = localStorage.getItem('access_token');
axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// axios.defaults.headers.common["x-api-key"] = api_key;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch(actions.authLogout());
    }
    return Promise.reject(error);
  }
);

export default axios;
