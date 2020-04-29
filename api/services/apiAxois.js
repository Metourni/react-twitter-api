const axios =require('axios');
const Config = require('../config')

// Add a request interceptor
axios.interceptors.request.use(
  async config => {
    config.headers.Authorization = `Bearer ${Config.twitter.api.bearerToken}`
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => Promise.reject(error)
)

module.exports = axios
