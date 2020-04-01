import React from 'react'
import PropTypes from "prop-types";
import {Skeleton} from "antd";

import style from './style.module.scss'

const ListUsers = (props) => {
  const {users, onItemSelect} = props

  const renderUser = user => {
    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          onItemSelect(user)
        }}
        className={style.itemLink}
      >
        <div className="air__utils__avatar mr-3">
          {
            user && user.avatar ?
              <img src={user.avatar} alt={user.fullName} />
              :
              <img src="resources/images/avatars/avatar.png" alt="User" />
          }

        </div>
        <div>
          <div className="text-blue">{user.fullName}</div>
        </div>
      </a>
    )
  }

  return (
    <div>
      <div className="text-uppercase font-size-12 mb-2 text-gray-6">Users ({users && users.list && !users.loading && users.list.length})
      </div>
      {
        users.loading?
          <ul className="list-unstyled">
            <li className={style.item}>
              <Skeleton loading active rows="1" />
            </li>
          </ul>
          :
          null
      }
      {
        users && !users.loading && users.list && users.list.length>0 ?
          <ul className="list-unstyled">
            {
              users.list.map(user=>(
                <li key={user.id} className={style.item}>
                  {renderUser(user)}
                </li>
              ))
            }
          </ul>
          :
          null
      }
      {
        users && !users.loading && (!users.list || users.list.length<=0) && !users.error  ?
          <ul className="list-unstyled">
            No result
          </ul>
          :
          null
      }
      {
        users && !users.loading && (!users.list || users.list.length<=0) && users.error  ?
          <ul className="list-unstyled">
            {users.error }
          </ul>
          :
          null
      }
    </div>
  )
}

export default ListUsers


ListUsers.propTypes = {
  users: PropTypes.object.isRequired,
  onItemSelect: PropTypes.func.isRequired,
}
