import actions from './actions'

const initialState = {
  topTweets: [],
  newTweets: [],
  loadingTopTweets: false,
  loadingNewTweets: false,
  errorLoadingTopTweets: "",
  errorLoadingNewTweets: "",
}

export default function tweetsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return {...state, ...action.payload}
    default:
      return state
  }
}
