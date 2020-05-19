import { all } from 'redux-saga/effects'
import users from './users/sagas'
import settings from './settings/sagas'
import timer from './timer/sagas'
import tweets from './tweets/sagas'

export default function* rootSaga() {
  yield all([
    users(),
    settings(),
    timer(),
    tweets()
  ])
}
