import React from 'react'

import Search from './Search'
import LanguageSwitcher from './LanguageSwitcher'
import Timer from './Timer'
import style from './style.module.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className={style.topbar}>
        <div>
          <img src="/resources/images/logo.png" alt="Twitter Api" width="30" />
        </div>
        <div className="mr-md-4 mr-auto ml-5">
          <Search />
        </div>
        <div className="mr-auto mr-4 d-none d-sm-block">
          <LanguageSwitcher />
        </div>
        <div className="">
          <Timer />
        </div>
      </div>
    )
  }
}

export default TopBar
