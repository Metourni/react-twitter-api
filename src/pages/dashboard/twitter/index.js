import React from 'react'
import { Helmet } from 'react-helmet'
import LeftSection from "../../../components/LeftSection";

class DashboardAnalytics extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Home page" />
        <LeftSection />
      </div>
    )
  }
}

export default DashboardAnalytics
