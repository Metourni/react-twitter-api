import React from 'react'
import { injectIntl } from 'react-intl'
import { Dropdown } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import List from './List'
import styles from './style.module.scss'

@injectIntl
class Search extends React.Component {
  render() {
    const {
      intl: { formatMessage },
    } = this.props
    const menu = (
      <React.Fragment>
        <div className="card air__utils__shadow width-330">
          <div className="card-body p-1 height-350">
            <Scrollbars
              autoHide
              renderThumbVertical={({ ...props }) => (
                <div
                  {...props}
                  style={{
                    width: '5px',
                    borderRadius: 'inherit',
                    backgroundColor: 'rgba(195, 190, 220, 0.4)',
                    left: '1px',
                  }}
                />
              )}
            >
              <div className="pt-4 px-4 pb-2">
                <List />
              </div>
            </Scrollbars>
          </div>
        </div>
      </React.Fragment>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
        <div className={styles.searchContainer}>
          <i className={`${styles.searchIcon} fe fe-search`} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder={formatMessage({ id: 'topBar.search' })}
          />
        </div>
      </Dropdown>
    )
  }
}

export default Search
