import actions from './actions'

const initialState = {
  topTweets: [

  ],
  newTweets: [
    /* {
      createdAt: "Wed Oct 10 20:19:24 +0000 2018",
      id: 105011862119892178,
      text: "First All for more expression, we will now count all emojis as equal—including those with gender‍‍‍ ‍‍and skin t… https://t.co/MkGjXf9aXm",
      retweetCount: 120,
      favoriteCount: 100,
    }, */
  ],
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
