import React from 'react'
import {connect} from 'react-redux'
import {Select, Button} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import Tweet from "../Tweet";


const mapStateToProps = ({users}) => ({users})

@connect(mapStateToProps)
class RightSection extends React.Component {
  state ={
    period:"1",
    typeLikedRetweeted: 'liked'
  }

  handleFilterValueChange =(key,value) =>{
    console.log(key,value)
    this.setState({
      [key]:value
    })

    // run search
  }

  render() {
    const {users:{current}}= this.props
    const {period,typeLikedRetweeted}= this.state;

    return (
      <div className="air__layout__grayBackground border-left py-4 px-4 h-100">
        <div>
          <div className="card">
            <div className="card-body p-3">
              <div className="d-flex flex-wrap align-items-center">
                <div className="flex-shrink-0 air__utils__avatar air__utils__avatar--size64 mr-4 mb-2">
                  <img src={current.avatar} alt={current.fullName} />
                </div>
                <div className="mb-2">
                  <div className="text-dark font-size-18 font-weight-bold text-nowrap">
                    {current.fullName}
                    {
                      current.verified ?
                        <i className="align-text-bottom fe fe-check-square text-success ml-2 font-size-24 " />
                        :
                        null
                    }
                  </div>
                  <div className="text-uppercase">
                    <span className="font-weight-bold">{current.followedCount}</span> Following
                  </div>
                  <div className="text-uppercase">
                    <span className="font-weight-bold">{current.followersCount}</span> Followers
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 text-center">
            <Select defaultValue={period} style={{ width: 180 }} onChange={e=>this.handleFilterValueChange("period",e)}>
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
            <Scrollbars style={{ height: 200 }} autoHide>
              {
                current && current.topTweets && current.topTweets.length>0?
                  (
                    current.topTweets.map(tweet=>
                      <Tweet key={tweet.id} tweet={tweet} />
                    )
                  )
                    :
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
