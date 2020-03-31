import actions from './actions'

const initialState = {
  list:[],
  current:{
    id:6253282,
    fullName:"Metourni Noureddine",
    verified:false,
    avatar:"resources/images/avatars/5.jpg",
    followedCount:12,
    followersCount:24
  },
  loading: false,
  error:"",
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
