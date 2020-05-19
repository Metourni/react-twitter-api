import React from 'react'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {Dropdown} from 'antd'
import {Scrollbars} from 'react-custom-scrollbars'

import userActions from "../../../../redux/users/actions";
import timerActions from "../../../../redux/timer/actions";
import tweetActions from "../../../../redux/tweets/actions";
import ListUsers from './ListUsers'

import styles from './style.module.scss'

const mapDispatchToProps = dispatch => ({
  search: query => {
    dispatch({
      type: userActions.SEARCH,
      payload: {
        query
      }
    });
  },
  setCurrentUser: user => {
    dispatch({
      type: userActions.SELECT_USER,
      payload: {
        id: user.id
      }
    });
  },
  setUser: data => {
    dispatch({
      type: userActions.SET_STATE,
      payload: data
    });
  },

  incrementTimer: ()=>{
    dispatch({
      type:timerActions.INCREMENT_TIMER
    })
  },

  clearTimer:()=>{
    dispatch({
      type:timerActions.CLEAR_TIMER
    })
  },
  clearSearchInput:()=>{
    dispatch({
      type: userActions.SET_STATE,
      payload: {searchString:""}
    });
  },
  clearSearchUsersList:()=>{
    dispatch({
      type: userActions.SET_STATE,
      payload: {list:[]}
    });
  },
  clearCurrentUserTopTweets: ()=>{
    dispatch({
      type:tweetActions.SET_STATE,
      payload:{
        topTweets:[],
        loadingTopTweets:false,
        errorLoadingTopTweets: "",
      }
    })
  },
  clearCurrentUserNewTweets: ()=>{
    dispatch({
      type:tweetActions.SET_STATE,
      payload:{
        newTweets:[],
        loadingNewTweets:false,
        errorLoadingNewTweets: "",
      }
    })
  },
});

@injectIntl
@connect(
  ({users}) => ({users}),
  mapDispatchToProps
)
class Search extends React.Component {
  interval;

  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef()
  }

  handleSearch = e => {
    const {value} = e.target
    const {search} =this.props;
    if (value && value.length>=2){
      search(value)
      // this.setState({searchValue:value})
    }
  }

  onSelectUser = user => {
    const {
      setCurrentUser,
    } =this.props;

    if (user){
      setCurrentUser(user);

      this.resetTimer()
      this.setTimer()
    }
  }

  setTimer = ()=>{
    const {incrementTimer} =this.props
    this.interval = setInterval(
      ()=>{
        incrementTimer()
      },
      1000
    )
    // clear the timer when finishing
    setTimeout(()=>{
      // We clear the timer, the current selected user, search input and search user list result.
      this.resetTimer();
      this.clearCurrentUser();
      this.clearSearchInput();
      this.clearUsersList();
      this.clearTweets();
    },1000 * 60)
  }

  resetTimer = ()=>{
    const {clearTimer} =this.props
    clearTimer()
    clearInterval(this.interval);
  }

  clearCurrentUser = ()=>{
    const {setUser} =this.props
    setUser({
      current:null
    });
  }

  clearTweets = ()=>{
    const {clearCurrentUserTopTweets,clearCurrentUserNewTweets}=this.props;
    clearCurrentUserTopTweets();
    clearCurrentUserNewTweets()
  }

  clearSearchInput= ()=>{
    const {clearSearchInput} =this.props
    clearSearchInput()
    if (this.searchInputRef && this.searchInputRef.current)
      this.searchInputRef.current.value = "";
  }

  clearUsersList = ()=>{
    const {clearSearchUsersList}= this.props;
    clearSearchUsersList();
  }


  render() {
    const {
      intl: {formatMessage},
      users
    } = this.props

    const menu = (
      <React.Fragment>
        <div className="card air__utils__shadow width-330">
          <div className="card-body p-1 height-350">
            <Scrollbars
              autoHide
              renderThumbVertical={({...props}) => (
                <div
                  {...props}
                  style={{
                    width: '5px',
                    borderRadius: 'inherit',
                    backgroundColor: 'rgba(195, 190, 220, 0.4)',
                    left: '1px',
                  }}
                />
              )}
            >
              <div className="pt-4 px-4 pb-2">
                <ListUsers users={users} onItemSelect={this.onSelectUser} searchString={users.searchString} />
              </div>
            </Scrollbars>
          </div>
        </div>
      </React.Fragment>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
        <div className={styles.searchContainer}>
          <i className={`${styles.searchIcon} fe fe-search`} />
          <input
            ref={this.searchInputRef}
            className={styles.searchInput}
            type="text"
            placeholder={formatMessage({id: 'topBar.search'})}
            onChange={this.handleSearch}
          />
        </div>
      </Dropdown>
    )
  }
}

export default Search
