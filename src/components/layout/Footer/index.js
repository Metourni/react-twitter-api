import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({settings}) => ({settings})

@connect(mapStateToProps)
const Footer = () => {
  const {
    settings: {isContentNoMaxWidth},
  } = this.props;

  return (
    <div
      className={classNames(style.footer, {
        [style.footerFullWidth]: isContentNoMaxWidth,
      })}
    >
      <div className={style.inner}>
        <div className="row">
          <div className="col-md-8">
            <p>
              <strong>Twitter api test</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
