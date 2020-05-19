import React from 'react'
import {connect} from 'react-redux'
import {Select, Button,Skeleton,Alert} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'

import style from './style.module.scss';
import Tweet from '../Tweet';
import tweetsActions from "../../redux/tweets/actions";

const mapStateToProps = ({users,tweets}) => ({users,tweets})
const mapDispatchToProps = dispatch =>({
  getTopTweets:(period,typeLikedRetweeted)=>{
    dispatch({
      type:tweetsActions.GET_TOP_TWEETS,
      payload:{
        period,
        typeLikedRetweeted
      }
    })
  }
})

@connect(mapStateToProps,mapDispatchToProps)
class RightSection extends React.Component {

  state ={
    period:"1",
    typeLikedRetweeted: 'liked'
  }

  handleFilterValueChange =(key,value) =>{
    const {getTopTweets} = this.props
    console.log(key,value)
    this.setState({
      [key]:value
    },()=>{
      const {period,typeLikedRetweeted} = this.state;
      getTopTweets(period,typeLikedRetweeted)
    })
  }

  render() {
    const {
      users:{current},
      tweets:{
        topTweets,
        loadingTopTweets,
        errorLoadingTopTweets,
      }
    }= this.props
    const {period,typeLikedRetweeted}= this.state;

    return (
      <div className="air__layout__grayBackground border-left py-4 px-4 h-100">
        <div>
          <div className="card">
            <div className="card-body p-3">
              <div className="d-flex flex-wrap align-items-center">
                <div className="flex-shrink-0 air__utils__avatar air__utils__avatar--size64 mr-4 mb-2">
                  {
                    current && current.avatar?
                      <img src={current.avatar} alt={current.fullName} />
                      :
                      <img src="resources/images/avatars/avatar.png" alt="User" />
                  }

                </div>
                <div className="mb-2">
                  <div className="text-dark font-size-18 font-weight-bold text-nowrap">
                    {current && current.fullName}
                    {
                      current && current.verified ?
                        <i className="align-text-bottom fe fe-check-square text-success ml-2 font-size-24 " />
                        :
                        null
                    }
                  </div>
                  <a
                    className="text-primary"
                    href={`https://twitter.com/${current && current.screenName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {current && current.screenName && `@${current.screenName}`}
                  </a>
                  <div className="text-uppercase">
                    <span className="font-weight-bold">{current && current.followedCount}</span> Following
                  </div>
                  <div className="text-uppercase">
                    <span className="font-weight-bold">{current && current.followersCount}</span> Followers
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 text-center">
            <Select defaultValue={period} className={style.periodSelect} onChange={e=>this.handleFilterValueChange("period",e)}>
              <Select.Option value="1">1 day</Select.Option>
              <Select.Option value="7">7 days</Select.Option>
              <Select.Option value="30">30 days</Select.Option>
            </Select>
            <div className="d-inline-flex ml-3">
              <Button
                value="liked"
                shape="circle"
                icon="heart"
                type={typeLikedRetweeted==="liked"?"primary":"default"}
                onClick={()=>this.handleFilterValueChange("typeLikedRetweeted","liked")}
              />
              <Button
                className="ml-2"
                value="retweeted"
                shape="circle"
                icon="retweet"
                type={typeLikedRetweeted==="retweeted"?"primary":"default"}
                onClick={()=>this.handleFilterValueChange("typeLikedRetweeted","retweeted")}
              />
            </div>
          </div>
          <div className="twits">
            <div className="h4">Top 2 <span className="text-capitalize">{typeLikedRetweeted}</span> tweets</div>
            <Scrollbars style={{height: 400}} autoHide>
              {
                loadingTopTweets?
                  <div>
                    <div className="card">
                      <div className="card-body py-2">
                        <Skeleton loading active rows="3" />
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body py-2">
                        <Skeleton loading active rows="3" />
                      </div>
                    </div>
                  </div>
                  :
                  null
              }

              {
                current && topTweets && !loadingTopTweets && topTweets.length>0?
                  (
                    topTweets.map(tweet=>
                      <Tweet key={`top-tweet_${tweet.id}`} tweet={tweet} />
                    )
                  )
                  :
                  null
              }
              {
                !loadingTopTweets && errorLoadingTopTweets && topTweets.length===0?
                  <div>
                    <Alert
                      message="Error Loading tweets"
                      description={errorLoadingTopTweets}
                      type="error"
                      closable
                    />
                  </div>:
                  null
              }
            </Scrollbars>
          </div>
        </div>
      </div>
    )
  }
}

export default RightSection
