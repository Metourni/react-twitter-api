import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Tweet = (props) => {

  const {tweet} = props

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-wrap mb-2">
          <div className="mr-auto">
            <div className="text-gray-5">{moment(tweet.createdAt).fromNow()}</div>
          </div>
        </div>
        <div className="mb-3">
          {tweet.text}
        </div>
        <div className="d-flex flex-wrap justify-content-start align-items-start mb-3">
          <a className="text-blue mr-3" href="#" onClick={e => e.preventDefault()}>
            <i className="icmn-heart mr-1" />{tweet.favoriteCount} Likes
          </a>
          <a className="text-blue mr-3" href="#" onClick={e => e.preventDefault()}>
            <i className="fa fa-retweet mr-1" />{tweet.retweetCount} Retweets
          </a>
        </div>
      </div>
    </div>
  )
}

export default Tweet


Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
}
