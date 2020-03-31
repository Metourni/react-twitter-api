import { all, takeEvery, put } from 'redux-saga/effects'
// import { notification } from 'antd'
// import { history } from 'index'
// import { login, currentAccount, logout } from 'services/user'
import actions from './actions'

export function* SEARCH() {
  // const { email } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.SEARCH, SEARCH),
  ])
}
