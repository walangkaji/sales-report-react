import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'
import SplashScreen from '../../../components/Loading/SplashScreen'
import LoadMore from '../../../components/LoadMore'
import queries from '../../../queries'
import lang from '../../../lib/utils/Lang'

import { graphql } from 'react-apollo'

class WishlistView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string,
    totalWishlist: React.PropTypes.number,
    wishlists: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  static WISHLIST_PER_PAGE = 10

  state = {
    page: 1,
    query: ''
  }

  constructor (props) {
    super(props)

    this.searchWishlist = this.searchWishlist.bind(this)
    this.viewMore = this.viewMore.bind(this)
  }

  searchWishlist (event) {
    this.setState({ query: event.target.value })
  }

  viewMore (event) {
    event.preventDefault()

    this.setState({ page: this.state.page + 1 }, () => {
      browserHistory.push({
        pathname: '/wishlist',
        query: { page: this.state.page }
      })
    })
  }

  render () {
    if (this.props.data.loading) {
      return (
        <SplashScreen />
      )
    }

    const user = this.props.data.user || {}
    const userInfo = Object.assign(user, {
      'deposit': this.props.data.saldo,
      'points': this.props.data.points,
      'notifications': this.props.data.notifications.data,
      'shop': this.props.data.shop,
      'wallet': this.props.data.wallet
    })

    const wlCount = this.props.wishlists.length

    return (
      <div>
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='wishlist' />
        <div className='u-clearfix'>
          {
            this.props.totalWishlist > 0 &&
            <div className='wishlist__searchbar-holder'>
              <i className='wishlist__icon wishlist__love-grey wishlist__set-love-grey' />
              <input
                type='text'
                name='searchwishlist'
                className='wishlist__searchbar'
                placeholder='Cari wishlist kamu'
                onChange={this.searchWishlist}
                value={this.state.query} />
              <span className='wishlist__count-item'>{ this.props.totalWishlist } item</span>
            </div>
          }

          <WishList
            userID={parseInt(userInfo['id'])}
            query={this.state.query}
            page={this.state.page}
            count={WishlistView.WISHLIST_PER_PAGE} />
        </div>

        {
          ((wlCount > 0 && this.props.totalWishlist > wlCount && this.state.query === '') ||
           (this.state.query !== '' && wlCount > WishlistView.WISHLIST_PER_PAGE)) &&
           <LoadMore onClick={this.viewMore}>
             {lang[this.props.lang]['View More']}
           </LoadMore>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    totalWishlist: state['wishlist'] ? state['wishlist'].totalWishlist : state.totalWishlist,
    wishlists: state['wishlist'] ? state['wishlist'].wishlists : state.wishlists
  }
}

export default graphql(queries.UserDataQuery, {
  options: { returnPartialData: true }
})(connect(mapStateToProps, undefined)(WishlistView))
