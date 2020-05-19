const TwitterApi = require("./twitterApi");
const ApiAxois = require("./apiAxois");
const config = require("../config")


const getTweets = async (params) => {
  return await TwitterApi.get('search/tweets', params)
    .then(result => {
      console.log('result: ', result);
      return result
    })
    .catch(error => {
      console.log('error: ', error);
      return null;
    })
}

/*
* params : eg {screen_name:'MetourniN', count:5 }
* */
const getUserTimelineTweets = async (params) => {
  //return await TwitterApi.get('search/tweets', params)
  return await TwitterApi.get('statuses/user_timeline', params)
    .then(result => {
      console.log('result: ', result);
      return result
    })
    .catch(error => {
      console.log('error: ', error);
      // console.log('tt =>',error.twitterReply);
      return null;
    })
}

const getUserTimelineTweetsAxios = async (params) => {
  //return await TwitterApi.get('search/tweets', params)
  return await ApiAxois.get(config.twitter.api.baseUrl+'/statuses/user_timeline.json', {params})
    .then(result => {
      // console.log('result: ', result);
      return result
    })
    .catch(error => {
      // console.log('error: ', error);
       console.log('getUserTimelineTweetsAxios error: ');
      // console.log('tt =>',error.twitterReply);
      return null;
    })
}

module.exports = {
  getTweets,
  getUserTimelineTweets,
  getUserTimelineTweetsAxios
}
