import API from './api'

import Config from '../config'

const getUserTweets= async (userId) =>{
  return API.get(`${Config.api.baseUrl}/tweets/timeline/user/${userId}`)
    .then(data=>data)
    .catch(error=>{
      console.log("error",error)
      return null
    })
}

const getUserTopTweets= async (userId,date,count=2) =>{
  const q = `user_id=${userId}&count=${count}&until=${date}`;
  return API.get(`${Config.api.baseUrl}/statuses/user_timeline.json?${q}`)
    .then(data=>data)
    .catch(error=>{
      console.log("error",error)
      return null
    })
}

export default {
  getUserTweets,
  getUserTopTweets
}

