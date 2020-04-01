import API from './api'

import * as TwitterConfig from '../config/twitter'


const getUserTweets= async (userId,count=TwitterConfig.DEFAULT_SEARCH_COUNT) =>{
  return API.get(`${TwitterConfig.API_BASE_URL}/statuses/user_timeline.json?user_id=${userId}&count=${count}`)
    .catch(data=>data)
    .then(error=>{
      console.log("error",error)
      return null
    })
}

const getUserTopTweets= async (userId,date,count=2) =>{
  const q = `user_id=${userId}&count=${count}&until=${date}`;
  return API.get(`${TwitterConfig.API_BASE_URL}/statuses/user_timeline.json?${q}`)
    .catch(data=>data)
    .then(error=>{
      console.log("error",error)
      return null
    })
}

export default {
  getUserTweets,
  getUserTopTweets
}

