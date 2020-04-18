import React from 'react';
import {connect} from 'react-redux'
import {Button, Skeleton, Alert} from "antd";

import Tweet from "../Tweet";
import tweetsActions from "../../redux/tweets/actions";

const LeftSection = (props) => {
  const handleLoadMoreClick = () => {
    const {loadMoreTweets} = props
    loadMoreTweets();
  }

  const {
    users: {current},
    tweets: {
      newTweets,
      loadingNewTweets,
      errorLoadingNewTweets,
    }
  } = props;

  return (
    <div>
      <div className="row mb-5">
        <div className="col-md-6">
          <Button type="primary" block onClick={handleLoadMoreClick} disabled={!current}>
            Load more tweets
          </Button>
        </div>
      </div>
      <div className="row">
        {
          loadingNewTweets ?
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
          current && !loadingNewTweets && newTweets && newTweets.length > 0 ?
            (
              newTweets.map(tweet =>
                <div key={tweet.id} className="col-md-6">
                  <Tweet key={tweet.id} tweet={tweet} />
                </div>
              )
            )
            :
            null
        }
        {
          !loadingNewTweets && errorLoadingNewTweets && newTweets.length === 0 ?
            <div>
              <Alert
                message="Error Loading tweets"
                description={errorLoadingNewTweets}
                type="error"
                closable
              />
            </div> :
            null
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({users, tweets}) => ({users, tweets});

const mapDispatchToProps = dispatch => ({
  loadMoreTweets: () => {
    dispatch({
      type: tweetsActions.LOAD_MORE_TWEETS
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSection)
