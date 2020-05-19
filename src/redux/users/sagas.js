import {all, takeEvery, put, call,select} from 'redux-saga/effects'
import HttpStatus from 'http-status-codes'
import usersService from 'services/users'
import actions from './actions'
import tweetsActions from '../tweets/actions'

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
      searchString:query
    },
  })

  const response = yield call(usersService.searchUsers, query)
  // console.log("SEARCH: ",response,response.data.users.length)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    response.data.users &&
    response.data.users.length > 0
  ) {

    // console.log('users: ',response.data.users)
    // Change the format of the response and put it u-in users array.
    const users = response.data.users.map(user =>
      (
        {
          id: user.id,
          idStr: user.id_str || user.id,
          fullName: user.name,
          screenName:user.screen_name,
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
        list:users,
        loading: false,
        error: ""
      }
    })
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        list:[],
        loading: false,
        error: "Can't load users data"
      },
    })
  }
}

// show user by id (fetch from server)
export function* SHOW({payload}) {
  const {id} = payload
  // start loading..
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    },
  })
  const response = yield call(usersService.showUser, id)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    response.data.user
  ) {

    // Change the format of the response and put it u-in users array.
    const {user} = response.data;
    yield put({
      type: actions.SET_STATE,
      payload: {
        current:user,
        loading: false,
        error: ""
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

// select user from the list of users (from local list).
export function* SELECT_USER({payload}) {
  const {id} = payload
  const user =yield select(getUserById,id)
  if(user){
    yield put({
      type: actions.SET_STATE,
      payload: {
        current: user,
        searchString:""
      }
    })

    // clear the existing tweets in the store.
    yield put({
      type: tweetsActions.SET_STATE,
      payload: {
        newTweets: [],
        topTweets: [],
      }
    })

    // Get user tweets.
    yield put({type: tweetsActions.GET_NEW_TWEETS})
    // Todo: get the popular tweets.
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
        searchString:"",
        list:[]
      }
    })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SEARCH, SEARCH),
    takeEvery(actions.SHOW, SHOW),
    takeEvery(actions.SELECT_USER, SELECT_USER),
    takeEvery(actions.CLEAR, CLEAR),
  ])
}
