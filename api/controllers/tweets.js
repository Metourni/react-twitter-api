const TweetsService = require('../services/tweets')

const getTweets = async(req, res) => {
  const params = {
    // q:'banana since:2011-07-11',
    screen_name:'MetourniN',
    count:5
  };
  const result =await TweetsService.getTweets(params)
  return res.json({tweets: result})
}

const getUserTimelineTweets = async(req, res) => {
  const params = {
    // q:'banana since:2011-07-11',
    screen_name:'MetourniN',
    count:5
  };
  const result =await TweetsService.getTweets(params)
  return res.json({tweets: result})
}

module.exports = {
  getTweets
}
