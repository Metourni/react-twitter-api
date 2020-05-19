import API from './api'

import Config from '../config'

const getUserTweets= async params =>{
  return API.get(`${Config.api.baseUrl}/tweets/timeline`,{params})
    .then(data=>data)
    .catch(error=>{
      console.log("error getting user timeline",error)
      return null
    })
}

const getUserTopTweets= async params =>{
  return API.get(`${Config.api.baseUrl}/tweets/top`,{params})
    .then(data=>data)
    .catch(error=>{
      console.log("error get User Top Tweets",error)
      return null
    })
}

export default {
  getUserTweets,
  getUserTopTweets
}

