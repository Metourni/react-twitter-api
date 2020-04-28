const TwitterApi = require("./twitterApi");

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
      return null;
    })
}

module.exports = {
  getTweets,
  getUserTimelineTweets
}
