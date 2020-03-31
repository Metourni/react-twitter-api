import {all, takeEvery, put, call,select} from 'redux-saga/effects'
import HttpStatus from 'http-status-codes'
import usersService from 'services/users'
import actions from './actions'

// select user from store.
const getUserById = (state, id) => {
  const {users: {list}} = state;

  // if null, undefined or empty array
  if (!list || list.length<=0)
    return null;

  const filter = list.filter(user => user.id===id)
  if (!list || list.length<=0)
    return null;

  return filter[0] ;
}

// search for users by keyword
export function* SEARCH({payload}) {
  const {query} = payload
  // start loading..
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })

  const response = yield call(usersService.searchUsers, query)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    response.data.length > 0
  ) {

    // Change the format of the response and put it u-in users array.
    const users = response.data.map(user =>
      (
        {
          id: user.id,
          fullName: user.name,
          verified: user.verified,
          avatar: user.profile_image_url_https,
          followedCount: user.friends_count,
          followersCount: user.followers_count
        }
      )
    )
    yield put({
      type: actions.SET_STATE,
      payload: {
        users,
        loading: false,
      }
    })
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        error: "Can't load users data"
      },
    })
  }
}

export function* SELECT_USER({payload}) {
  const {id} = payload
  const user =yield select(getUserById,id)
  if(user){
    yield put({
      type: actions.SET_STATE,
      payload: {
        current: user,
      }
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload: {
        current: {},
      }
    })
  }
}

export function* CLEAR() {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading:false,
        error:"",
        current: {},
        list:[]
      }
    })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SEARCH, SEARCH),
    takeEvery(actions.SELECT_USER, SELECT_USER),
    takeEvery(actions.CLEAR, CLEAR),
  ])
}
