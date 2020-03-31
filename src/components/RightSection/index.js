import React from 'react'
import {connect} from 'react-redux'
import { Select ,Radio} from 'antd';

const mapStateToProps = ({users}) => ({users})

@connect(mapStateToProps)
class RightSection extends React.Component {

  handleFilterValueChange =() =>{

  }

  render() {
    const {users:{current}}= this.props
    return (
      <div className="air__layout__grayBackground border-left py-4 px-4 h-100">
        <div>
          <div className="card">
            <div className="card-body p-3">
              <div className="d-flex flex-wrap align-items-center">
                <div className="flex-shrink-0 air__utils__avatar air__utils__avatar--size64 mr-4 mb-2">
                  <img src={current.avatar} alt={current.fullName} />
                </div>
                <div className="mb-2">
                  <div className="text-dark font-size-18 font-weight-bold text-nowrap">
                    {current.fullName}
                    {
                      current.verified ?
                        <i className="align-text-bottom fe fe-check-square text-success ml-2 font-size-24 " />
                        :
                        null
                    }
                  </div>
                  <div className="text-uppercase">
                    <span className="font-weight-bold">{current.followedCount}</span> Following
                  </div>
                  <div className="text-uppercase">
                    <span className="font-weight-bold">{current.followersCount}</span> Followers
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <Select defaultValue="1" style={{ width: 180 }} onChange={this.handleFilterValueChange}>
              <Select.Option value="1">1 day</Select.Option>
              <Select.Option value="7">7 days</Select.Option>
              <Select.Option value="30">30 days</Select.Option>
            </Select>
            <Radio.Group onChange={this.handleFilterValueChange} defaultValue="a">
              <Radio.Button value="liked" shape="circle" icon={<i className="fe fe-heart" />} size="large" />
              <Radio.Button value="retweeted" shape="circle" icon={<i className="fe fe-circle" />} size="large" />
            </Radio.Group>
          </div>
          <div className="table-responsive">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-gray-6 pl-0">Location</td>
                  <td className="pr-0 text-right text-dark">New York</td>
                </tr>
                <tr>
                  <td className="text-gray-6 pl-0">Phone</td>
                  <td className="pr-0 text-right text-dark">+1 800 367 4784</td>
                </tr>
                <tr>
                  <td className="text-gray-6 pl-0">Email</td>
                  <td className="pr-0 text-right text-dark">mail@google.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default RightSection
