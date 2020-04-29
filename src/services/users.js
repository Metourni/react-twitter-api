import API from './api'
import Config from '../config'
// import SearchConstants from '../constants/search'

const searchUsers= async (query) =>{
  return API.get(`${Config.api.baseUrl}/users/search/${query}`)
    .then(data=>data)
    .catch(error=>{
      console.log("error",error)
      return null
    })
}

const showUser= async (id) =>{
  return API.get(`${Config.api.baseUrl}/users/show/${id}`)
    .then(data=>data)
    .catch(error=>{
      console.log("error",error)
      return null
    })
}

export default {
  searchUsers,
  showUser
}

