// todo: Add the necessary herders later

import axios from 'axios'
// import HttpStatus from 'http-status-codes'
/*
import * as TwitterConfig from '../config/twitter'

// Add a request interceptor
axios.interceptors.request.use(
  async config => {
    config.headers["Client-ID"] =TwitterConfig.CLIENT_ID
    return config
  },
  error => {
    Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === HttpStatus.UNAUTHORIZED) {

      console.log('UNAUTHORIZED')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)
*/
export default axios
