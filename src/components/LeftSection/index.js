import React from 'react';
import {connect} from 'react-redux'
import {Button,Skeleton,Alert} from "antd";
import Tweet from "../Tweet";

const mapStateToProps = ({users,tweets}) =>({users,tweets})
const mapDispatchToProps = dispatch =>({
  loadMoreTweets : ()=>{
    dispatch({
      type:''
    })
  }
})

@connect(mapStateToProps,mapDispatchToProps)
class LeftSection extends React.Component{

  render() {
    const {
      users:{current},
      tweets:{
        newTweets,
        loadingNewTweets,
        errorLoadingNewTweets,
      }
    } = this.props;
    console.log('current',current)

    return (
      <div>
        <div className="row mb-5">
          <div className="col-md-6">
            <Button type="primary" block>
              Load more tweets
            </Button>
          </div>
        </div>
        <div className="row">
          {
            loadingNewTweets?
              <div className="col-md-12 row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body py-2">
                      <Skeleton loading active rows="4" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body py-2">
                      <Skeleton loading active rows="4" />
                    </div>
                  </div>
                </div>
              </div>
              :
              null
          }
          {
            current && !loadingNewTweets && newTweets && newTweets.length>0?
              (
                newTweets.map(tweet=>
                  <div className="col-md-6">
                    <Tweet key={tweet.id} tweet={tweet} />
                  </div>
                )
              )
              :
              null
          }
          {
            !loadingNewTweets && errorLoadingNewTweets && newTweets.length===0?
              <div>
                <Alert
                  message="Error Loading tweets"
                  description={errorLoadingNewTweets}
                  type="error"
                  closable
                />
              </div>:
              null
          }
        </div>

      </div>
    )
  }
}

export default LeftSection
