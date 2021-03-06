import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import users from './users/reducers'
import settings from './settings/reducers'
import timer from './timer/reducers'
import tweets from './tweets/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    users,
    settings,
    timer,
    tweets,
  })
