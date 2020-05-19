import {all, takeEvery, put, call, select} from 'redux-saga/effects'
import HttpStatus from 'http-status-codes'

import tweetsService from '../../services/tweets';
import actions from './actions'
import ArrayHelper from '../../helper/array'

const getCurrentUser = state => state.users.current;

const getNewTweets = state => state.tweets.newTweets;

export function* GET_TOP_TWEETS({payload}) {
  const {period, typeLikedRetweeted} = payload

  const currentUser = yield select(getCurrentUser)

  // start loading..
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingTopTweets: true,
    },
  })

  // If there is no selected user return empty array.
  if (!currentUser) {
    // start loading..
    yield put({
      type: actions.SET_STATE,
      payload: {
        errorLoadingTopTweets: "No selected user",
        topTweets: [],
        loadingTopTweets: false,
      },
    });
    return;
  }
  const params={
    user_id:currentUser.id,
    type:typeLikedRetweeted,
    days: period,
  }

  const response = yield call(tweetsService.getUserTopTweets, params)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    response.data.tweets &&
    response.data.tweets.length > 0
  ) {

    // reformat array
    const topTweets = response.data.tweets.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      retweetCount: tweet.retweet_count,
      favoriteCount: tweet.favorite_count,
      createdAt: tweet.created_at,
    }))

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingTopTweets: false,
        topTweets,
        errorLoadingTopTweets: ""
      },
    })
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingTopTweets: false,
        topTweets: [],
        errorLoadingTopTweets: "No tweets founds!! try again with other values"
      },
    })
  }
}

// ---- New tweets section ----- //
// get new tweets.
export function* GET_NEW_TWEETS() {
  console.log("GET_NEW_TWEETS")
  const params={
    count:2,
  }

  // start fetching..
  yield put({
    type: actions.FETCH_CURRENT_USER_NEW_TWEETS,
    payload: {params}
  })
}

// when clicking on load more btn.
export function* LOAD_MORE_TWEETS() {
  console.log("LOAD_MORE_TWEETS")

  const newTweets = yield select(getNewTweets)

  // if there is no tweets we load it.
  if(newTweets.length<=0){
    // start loading..
    yield put({
      type: actions.GET_NEW_TWEETS,
    });
  }else{
    // const lastTweet = newTweets.slice(-1).pop()
    const firstTweet = newTweets[0]
    const params={
      count:1,
      max_id:firstTweet && firstTweet.id
    }
    yield put({
      type: actions.FETCH_CURRENT_USER_NEW_TWEETS,
      payload: {params},
    })
  }
}

// get the data from server
export function* FETCH_CURRENT_USER_NEW_TWEETS({payload}) {
  /* example: params={
    user_id:currentUser.id,
    count:2,
  } */
  const {params}= payload
  console.log("params: ",params)

  // start loading..
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingNewTweets: true,
    },
  })

  // get selected user
  const currentUser = yield select(getCurrentUser)

  // If there is no selected user return empty array.
  if (!currentUser) {
    // start loading..
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingNewTweets: false,
        // newTweets: [],
        errorLoadingNewTweets: "Can't Loading New Tweets"
      },
    });
  }else{
    const response = yield call(tweetsService.getUserTweets, {...params,user_id:currentUser.id})
    console.log("response", response)
    if (
      response &&
      response.status &&
      response.status === HttpStatus.OK &&
      response.data &&
      response.data.tweets &&
      response.data.tweets.length > 0
    ) {
      // get selected user
      const existingNewTweets = yield select(getNewTweets)

      // Format array
      const fetchedNewTweets = response.data.tweets.map(tweet => ({
        id: tweet.id,
        text: tweet.text,
        retweetCount: tweet.retweet_count,
        favoriteCount: tweet.favorite_count,
        createdAt: tweet.created_at,
      }))
      console.log("tweets: ", existingNewTweets, fetchedNewTweets)

      // instance of using sort we can use reverse because it's already sorted from twitter api
      // we just inverse the order
      fetchedNewTweets.reverse()
      // order array
      // newTweets.sort(ArrayHelper.compareArrayOfObject('createdAt', 'desc'))

      yield put({
        type: actions.SET_STATE,
        payload: {
          loadingNewTweets: false,
          newTweets:[...fetchedNewTweets,...existingNewTweets],
          errorLoadingNewTweets: ""
        },
      })
    } else {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loadingNewTweets: false,
          errorLoadingNewTweets: "Can't Loading New Tweets"
        },
      })
    }
  }

}

// ---- New tweets section ----- //

export function* GET_USER_TWEETS({payload}) {
  const {id} = payload
  // start loading..
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingNewTweets: true,
    },
  })

  const response = yield call(tweetsService.getUserTweets, id)
  console.log("response", response)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    response.data.tweets &&
    response.data.tweets.length > 0
  ) {
    const {tweets} = response.data;
    // Format array
    const newTweets = tweets.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      retweetCount: tweet.retweet_count,
      favoriteCount: tweet.favorite_count,
      createdAt: tweet.created_at,
    }))

    // order array
    newTweets.sort(ArrayHelper.compareArrayOfObject('createdAt', 'desc'))

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingNewTweets: false,
        newTweets,
        errorLoadingNewTweets: ""
      },
    })
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingNewTweets: false,
        newTweets: [],
        errorLoadingNewTweets: "No tweet found"
      },
    })
  }
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_TOP_TWEETS, GET_TOP_TWEETS),
    takeEvery(actions.GET_NEW_TWEETS, GET_NEW_TWEETS),
    takeEvery(actions.LOAD_MORE_TWEETS, LOAD_MORE_TWEETS),
    takeEvery(actions.GET_USER_TWEETS, GET_USER_TWEETS),
    takeEvery(actions.FETCH_CURRENT_USER_NEW_TWEETS, FETCH_CURRENT_USER_NEW_TWEETS),
  ])
}
