import API from './api'

import * as TwitterConfig from '../config/twitter'


const searchUser= async (query,count=TwitterConfig.DEFAULT_SEARCH_COUNT) =>{
  return API.get(`${TwitterConfig.API_BASE_URL}/users/search.json?q=${query}&count=${count}`)
}

export default {
  searchUser
}

