import {all, takeEvery, put, call, select} from 'redux-saga/effects'
import moment from "moment";
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
        errorLoadingTopTweets: false,
        topTweets: []
      },
    });
    return;
  }

  // convert time format
  const today = moment();
  const util = today.subtract(period, 'days').format("YYYY-MM-DD");

  const response = yield call(tweetsService.getUserTopTweets, currentUser.id, util)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    response.data.length > 0
  ) {

    // reformat array
    let topTweets = response.data.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      retweetCount: tweet.retweet_count,
      favoriteCount: tweet.favorite_count,
      createdAt: tweet.created_at,
    }))

    // order array
    const key = typeLikedRetweeted === "retweeted" ? "retweetCount" : "favoriteCount";
    topTweets = topTweets.sort(ArrayHelper.compareArrayOfObject(key,'desc'))

    // slice only two element
    topTweets = topTweets.slice(0, 2)

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
        errorLoadingTopTweets: "Can't Loading New Tweets"
      },
    })
  }
}

export function* GET_NEW_TWEETS({payload}) {
  const {count} = payload
  // start loading..
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingNewTweets: true,
    },
  })

  const currentUser = yield select(getCurrentUser)

  // If there is no selected user return empty array.
  if (!currentUser) {
    // start loading..
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingNewTweets: false,
        newTweets: []
      },
    });
    return;
  }
  console.log("response before")
  const response = yield call(tweetsService.getUserTweets, currentUser.id, count)
  console.log("response",response)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    response.data.length > 0
  ) {

    // Format array
    const newTweets = response.data.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      retweetCount: tweet.retweet_count,
      favoriteCount: tweet.favorite_count,
      createdAt: tweet.created_at,
    }))

    // order array
    newTweets.sort(ArrayHelper.compareArrayOfObject('createdAt','desc'))

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
        errorLoadingNewTweets: "Can't Loading New Tweets"
      },
    })
  }
}

export function* LOAD_MORE_TWEETS() {
  const newTweets = yield select(getNewTweets)
  yield put({
    type: actions.GET_NEW_TWEETS,
    payload: {
      count: newTweets.length + 1
    },
  })
}

export function* ORDER_TOP_TWEETS({payload}) {
  const {typeLikedRetweeted} = payload
  const currentUser = yield select(getCurrentUser)

  // If there is no selected user return empty array.
  if (!currentUser) {
    // start loading..
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingTopTweets: false,
        errorLoadingTopTweets: false,
        topTweets: []
      },
    });
    return;
  }

  // reformat array
  let topTweets = yield select(getNewTweets)

  // order array
  const key = typeLikedRetweeted === "retweeted" ? "retweetCount" : "favoriteCount";
  topTweets = topTweets.sort(ArrayHelper.compareArrayOfObject(key,'desc'))

  // slice only two element
  topTweets = topTweets.slice(0, 2)

  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingTopTweets: false,
      topTweets,
      errorLoadingTopTweets: "a"
    },
  })
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_TOP_TWEETS, GET_TOP_TWEETS),
    takeEvery(actions.GET_NEW_TWEETS, GET_NEW_TWEETS),
    takeEvery(actions.LOAD_MORE_TWEETS, LOAD_MORE_TWEETS),
    // todo: remove
    takeEvery(actions.ORDER_TOP_TWEETS, ORDER_TOP_TWEETS),
  ])
}
