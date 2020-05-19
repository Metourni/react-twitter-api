const TweetsService = require('../services/tweets')

// Todo: this is a test route tobe deleted.
const getTweets = async(req, res) => {
  const params = {
    // q:'banana since:2011-07-11',
    screen_name:'MetourniN',
    count:5
  };
  const result =await TweetsService.getTweets(params)
  return res.json({tweets: result})
}

// Get the user timeline with pagination.
const getUserTimelinePaginatedTweets = async(req, res) => {
  const {user_id,count,max_id} = req.query;

  // set default value of count
  let req_count=5;
  if (count)
    req_count=max_id? Number.parseInt(count)+1 :count;

  console.log('user_id',user_id);
  console.log('max_id',max_id);
  console.log('count',req_count);

  const params={
    user_id,
    exclude_replies:true,
    trim_user:true,
    max_id,
    // screen_name:"BarackObama",//"meriem_nait_",//"BillGates",//"realDonaldTrump",//"elonmusk",
    count:req_count,
  };
  const result = await TweetsService.getUserTimelineTweetsAxios(params)
  if(
    result &&
    result.data &&
    result.data.length>0
  ){
    let tweets = result.data
    if (max_id)
      tweets.splice(0,1);

    console.log('tweets: ' ,tweets.length);

    return res.json({tweets})
  }else{
    return res.status(404).json("Not found")
  }
}


module.exports = {
  getTweets,
  getUserTimelinePaginatedTweets
}
