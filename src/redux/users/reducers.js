import actions from './actions'

const initialState = {
  list:[
    /* {
      id:6253282,
      fullNa  me:"Metourni Noureddine",
      verified:false,
      avatar:"resources/images/avatars/5.jpg",
      followedCount:12,
      followersCount:24
    },
     */
  ],
  current:null,
  loading: false,
  searchString:"",
  error:"No data",
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
