import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { graphql } from 'react-apollo'
import queries from '../../../queries'

import HotList from './HotList'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import './HotListView.scss'
import lang from '../../../lib/utils/Lang'

class HotListView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string
  }

  state = {
    page: 1
  }

  constructor (props) {
    super(props)

    this.viewMore = this.viewMore.bind(this)
  }

  viewMore (event) {
    event.preventDefault()

    this.setState({ page: this.state.page + 1 }, () => {
      browserHistory.push({
        pathname: '/hot',
        query: { page: this.state.page }
      })
    })
  }

  render () {
    return (
      <div>
        <HeaderHomeOld userInfo={this.props.data.user} tabIsAvailable activeTab='hotlist' />

        <div className='u-clearfix hotlist hotlist--single-page u-mt2'>
          <h1 className='text-header text-header-green u-center'>Hot list</h1>

          <HotList page={this.state.page} />

          <div className='hotlist-showall'>
            <a className='link-green' href='#' onClick={this.viewMore}>
              {lang[this.props.lang]['View More']} &nbsp; &gt;
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}

export default graphql(queries.HomeQuery)(connect(mapStateToProps, undefined)(HotListView))
