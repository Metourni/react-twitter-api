import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {Badge} from 'antd'

import style from './style.module.scss'
import timerActions from  '../../../../redux/timer/actions'


const mapDispatchToProps = dispatch =>({
  incrementTimer: ()=>{
    dispatch({
      type:timerActions.INCREMENT_TIMER
    })
  }
})

@connect(
  ({timer})=>({timer}),
  mapDispatchToProps
)
class Timer extends React.Component {

  componentDidMount() {
    // run the timer ...
    const {incrementTimer} =this.props
    setInterval(()=>{
      incrementTimer();
    },1000)
  }

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
