const moment = require("moment");

const ArrayHelper = require("../helpers/array");
const TweetsService = require('../services/tweets');

// Get the user timeline with pagination.
const getUserTimelinePaginatedTweets = async (req, res) => {
  const {user_id, count, max_id} = req.query;

  // set default value of count
  let req_count = 5;
  if (count)
    req_count = max_id ? Number.parseInt(count) + 1 : count;

  console.log('user_id', user_id);
  console.log('max_id', max_id);
  console.log('count', req_count);

  const params = {
    user_id,
    exclude_replies: true,
    trim_user: true,
    max_id,
    // screen_name:"BarackObama",//"meriem_nait_",//"BillGates",//"realDonaldTrump",//"elonmusk",
    count: req_count,
  };
  const result = await TweetsService.getUserTimelineTweetsAxios(params)
  if (
    result &&
    result.data &&
    result.data.length > 0
  ) {
    let tweets = result.data
    if (max_id)
      tweets.splice(0, 1);

    console.log('tweets: ', tweets.length);

    return res.json({tweets})
  } else {
    return res.status(404).json("Not found")
  }
}


/*
*
* Description: Get the user top tweets
* Params: user_id; type:(retweeted || liked); days: (1, 7, 30)
* response: {user:{...}} or 404.
*
* */
const getUserTopTweets = async (req, res) => {
  const {user_id, type, days} = req.query;

  console.log('user_id', user_id);
  console.log('type', type);
  console.log('days', days);

  const params = {
    user_id,
    exclude_replies: true,
    trim_user: true,

    // for the count we get the max we can
    // because there is no date inside params of get use timeline endpoint
    // count,
  };
  const result = await TweetsService.getUserTimelineTweetsAxios(params)
  if (
    result &&
    result.data &&
    result.data.length > 0
  ) {
    let tweets = result.data;

    // get the start date for filter.
    const today = moment();
    // if Today is 2020-09-17 and Days is 7 then minDate will be  2020-09-10.
    const minDate = today.subtract(days, 'days').format("YYYY-MM-DD");
    console.log("minDate", minDate);

    // filter by interval.
    tweets = tweets.filter(tweet=>{
      // convert the created_at date format
      const createdAt= moment(tweet.created_at,"ddd MMM DD HH:mm:ss Z YYYY").format("YYYY-MM-DD")

      // console.log(createdAt,' isSameOrAfter ',minDate,' ',moment(createdAt).isSameOrAfter(minDate));
      // return only the dates bigger or equal to minDate.
      return moment(createdAt).isSameOrAfter(minDate);
    })

    // order array
    const key = type === "retweeted" ? "retweet_count" : "favorite_count";
    let topTweets = await tweets.sort(ArrayHelper.compareArrayOfObject(key, 'desc'))

    // slice only two element
    topTweets = topTweets.slice(0, 2);

    const dd = topTweets.map(t => ({
      id: t.id,
      retweet_count: t.retweet_count,
      favorite_count: t.favorite_count,
      created_at: t.created_at,
    }));

    console.log('tweets: ', topTweets.length);

    return res.json({tweets: topTweets, dd})
  } else {
    return res.status(404).json("Not found")
  }
}

module.exports = {
  getUserTimelinePaginatedTweets,
  getUserTopTweets
}
