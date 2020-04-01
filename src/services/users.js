import API from './api'

import * as TwitterConfig from '../config/twitter'


const searchUsers= async (query,count=TwitterConfig.DEFAULT_SEARCH_COUNT) =>{
  return API.get(`${TwitterConfig.API_BASE_URL}/users/search.json?q=${query}&count=${count}`)
    .catch(data=>data)
    .then(error=>{
      console.log("error",error)
      return null
    })
}

export default {
  searchUsers
}

