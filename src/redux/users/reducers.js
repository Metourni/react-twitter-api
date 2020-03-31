import actions from './actions'

const initialState = {
  list:[
    {
      id:6253282,
      fullName:"Metourni Noureddine",
      verified:false,
      avatar:"resources/images/avatars/5.jpg",
      followedCount:12,
      followersCount:24
    },
    {
      id:6253283,
      fullName:"Mikle jhons",
      verified:false,
      avatar:"resources/images/avatars/4.jpg",
      followedCount:12,
      followersCount:24
    },
  ],
  current:null,
  loading: false,
  error:"Makach data",
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
