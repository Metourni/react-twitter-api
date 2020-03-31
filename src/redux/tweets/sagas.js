import { all, takeEvery, put } from 'redux-saga/effects'
import actions from './actions'

export function* GET_TOP_TWEETS({payload}) {
  const { period,liredRetweeted } = payload
  console.log('data',period,liredRetweeted)
  // Todo: call the service.
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loadingTopTweets: true,
      topTweets : []
    },
  })
}

export function* GET_NEW_TWEETS() {
  // Todo: call the service.
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loadingNewTweets: true,
      newTweets:[]
    },
  })
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_TOP_TWEETS, GET_TOP_TWEETS),
    takeEvery(actions.GET_NEW_TWEETS, GET_NEW_TWEETS),
  ])
}
