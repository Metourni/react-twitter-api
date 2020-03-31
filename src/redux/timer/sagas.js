import {all, put, takeEvery, select} from 'redux-saga/effects'
import actions from './actions'

const getCurrentTime = state => {
  // console.log('state',state);
  return state.timer.time
}
const getFinalTime = state => state.timer.finalTime

export function* INCREMENT_TIMER() {
  const time = yield select(getCurrentTime)
  const finalTime = yield select(getFinalTime)
  // console.log('INCREMENT_TIMER',time,finalTime)
  if (time + 1 > finalTime) {
    // todo: clear the store...
    yield put({type: actions.CLEAR_TIMER})
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        time: time + 1
      }
    })
  }
}

export function* CLEAR_TIMER() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      time: 0
    }
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.INCREMENT_TIMER, INCREMENT_TIMER),
    takeEvery(actions.CLEAR_TIMER, CLEAR_TIMER),
  ])
}
