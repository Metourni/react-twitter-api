import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {Badge} from 'antd'

import style from './style.module.scss'


@connect(({timer})=>({timer}))
class Timer extends React.Component {
  render() {
    const {
      timer: {time},
    } = this.props

    return (
      <div>
        <Badge count={time}>
          <div>
            <i className={classNames('fe fe-clock',style.clockIcon)} />
          </div>
        </Badge>
      </div>
    )
  }
}

export default Timer
