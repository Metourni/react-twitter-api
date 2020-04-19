import React from 'react'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {Dropdown} from 'antd'
import {Scrollbars} from 'react-custom-scrollbars'

import ListUsers from './ListUsers'
import styles from './style.module.scss'
import userActions from "../../../../redux/users/actions";
import timerActions from "../../../../redux/timer/actions";
import tweetActions from "../../../../redux/tweets/actions";


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
  getCurrentUserTopTweets: ()=>{
    dispatch({
      type:tweetActions.GET_TOP_TWEETS
    })
  },
  getCurrentUserNewTweets: ()=>{
    dispatch({
      type:tweetActions.GET_TOP_TWEETS
    })
  }
})

@injectIntl
@connect(
  ({users}) => ({users}),
  mapDispatchToProps
)
class Search extends React.Component {
  interval;

  state= {
    searchValue:""
  }

  handleSearch = e => {
    const {value} = e.target
    const {search} =this.props;
    if (value && value.length>2){
      search(value)
      this.setState({searchValue:value})
    }
  }

  onSelectUser = user => {
    const {
      setCurrentUser,
      // getCurrentUserTopTweets,
      // getCurrentUserNewTweets
    } =this.props;
    if (user){
      setCurrentUser(user);
      // call those function when the api is ready
      // getCurrentUserTopTweets();
      // getCurrentUserNewTweets();
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
      this.resetTimer();
      this.clearCurrentUser();
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


  render() {
    const {
      intl: {formatMessage},
      users
    } = this.props

    const {searchValue} = this.state;

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
                <ListUsers users={users} onItemSelect={this.onSelectUser} searchString={searchValue} />
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
