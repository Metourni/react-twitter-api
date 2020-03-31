import React from 'react'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

class Error500 extends React.Component {
  render() {
    return (
      <div className={style.errors}>
        <div className="pt-4 pb-4 d-flex align-items-end mt-auto">
          <div className="air__utils__logo__text">
            <div className="air__utils__logo__name text-uppercase text-dark font-size-21">
              Twitter test
            </div>
          </div>
        </div>
        <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 mb-auto text-dark font-size-30`}>
          <div className="font-weight-bold mb-3">Server Error</div>
          <div>This page is deprecated, deleted, or does not exist at all</div>
          <div className="font-weight-bold font-size-70 mb-1">500 —</div>
          <Link to="/" className="btn btn-outline-primary width-100">
            Go Back
          </Link>
        </div>
      </div>
    )
  }
}

export default Error500
