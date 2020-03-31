import API from './api'

import * as TwitterConfig from '../config/twitter'


export const getUser= async query =>{
  return API.get(`${TwitterConfig.API_BASE_URL}?q=${query}`)
}
