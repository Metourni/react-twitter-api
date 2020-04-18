import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {Badge} from 'antd'

import style from './style.module.scss'

const Timer = (props) => {
  const {
    timer: {time},
  } = props

  return (
    <div>
      <Badge count={time}>
        <div>
          <i className={classNames('fe fe-clock', style.clockIcon)} />
        </div>
      </Badge>
    </div>
  )
}

const mapStateToProps = ({timer}) => ({timer});

export default connect(mapStateToProps)(Timer)
