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
  const {id} = req.params
  console.log('id',id)
  /*
  const params = {
    q:'@NASA since:2018-07-11',
    // screen_name:'MetourniN',
    // user_id: id,
    count:5,
    // exclude_replies:true,
    // trim_user: false,
    result_type: 'recent',
    include_entities:false,
    // since_id
  };
   */

  const params_2 ={
    user_id: id,
    exclude_replies:true,
    trim_user:true,
    count:3
  }
  const result = await TweetsService.getUserTimelineTweetsAxios(params_2)
    .catch(()=>{return null})
  if(
    result &&
    result.data &&
    result.data.length>0
  ){
    const tweets = result.data
    console.log('tweets: ' ,tweets)

    return res.json({tweets})
  }else{
    return res.status(404).json("Not found")
  }
}

module.exports = {
  getTweets,
  getUserTimelineTweets
}
