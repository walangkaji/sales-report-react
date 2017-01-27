import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import queries from './../../../queries'
import TextHeader from '../../../components/TextHeader'
import TopAdsIntegrate from '../../../components/TopAds/TopAdsIntegrate'
import ArrayHelper from '../../../lib/utils/ArrayHelper'
import LoadMore from '../../../components/LoadMore'
import lang from '../../../lib/utils/Lang'
import { replaceFeeds, updatePage, updateQuery } from '../module'

const MODAL_PARAMS = {
  modalContent: {
    data: [
      {
        icon: 'https://ecs1.tokopedia.net/img/ads_microsite/stat.png',
        title: 'Tingkatkan penjualan',
        content: `Toko dan produk anda akan lebih mudah
          ditemukan oleh pengunjung Tokopedia.`
      },
      {
        icon: 'https://ecs1.tokopedia.net/img/ads_microsite/jangkau.png',
        title: 'Menjangkau dengan tepat',
        content: `TopAds membantu Anda menjangkau calon pembeli yang sesuai, melalui
          pencarian produk dan penelusuran kategori produk.`
      },
      {
        icon: 'https://ecs1.tokopedia.net/img/ads_microsite/efektif.png',
        title: 'Efektif dan Efisien',
        content: `Dengan TopAds, hasil yang anda harapkan sesuai dengan biaya
          yang anda keluarkan.`
      }
    ],
    link: 'https://m.tokopedia.com/iklan?campaign=topads&amp;source=wishlist&amp;medium=mobile',
    linkText: 'Baca selengkapnya'
  }
}

class Feed extends Component {

  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string,
    lang: PropTypes.string,
    ob: PropTypes.number,
    page: PropTypes.number,
    uniqueID: PropTypes.string,
    userID: PropTypes.number,
    fetchMore: PropTypes.func,
    replaceFeeds: PropTypes.func,
    updatePage: PropTypes.func,
    updateQuery: PropTypes.func,
    activateShop: PropTypes.func,
    deactivateShop: PropTypes.func,
    get_feed:  PropTypes.object, // object returned from graphql
    feeds: PropTypes.arrayOf(PropTypes.object), // our redux state that's actually calculated
    ep: React.PropTypes.string,
    src: React.PropTypes.string,
    item: React.PropTypes.number,
    q: React.PropTypes.string,
    topAdsReudyx: PropTypes.object,
    topads: PropTypes.object
  }

  state = {
    modalState: false,
    page: this.props.page
  }

  constructor (props) {
    super(props)

    this.viewMore = this.viewMore.bind(this)
    this._eventModal = this._eventModal.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.loading) {
      const oldData = this.props.feeds
      // get from graphql feed
      const fd = nextProps.get_feed || { has_next_page: false, items: [], total_data: 0 }
      const feeds = fd.items || []
      const newFeeds = feeds.map(fd => Object.assign({}, fd))
      // get from graphql topads
      const ta = nextProps.topads || { display: '', items: [], total_data: 0 }
      const topAds = ta.items || []
      const newTopAds = topAds.map(ta => Object.assign({}, ta, { isActive: false }))
      // make structure 2d
      const newData = [
        { kind: 'topads', display: ta['display'], items: newTopAds },
        { kind: 'feed', items: newFeeds }
      ]
      // combine 2 data
      let payload = [...oldData, ...newData]
      this.props.replaceFeeds(payload)
    }
  }

  _eventModal (state) {
    this.setState({
      modalState: state,
      page: this.state.page
    })
  }

  viewMore () {
    this.setState({
      modalState: this.state.modalState,
      page: this.state.page + 1
    }, () => {
      this.props.fetchMore(this.state.page)
      browserHistory.push({
        pathname: '/feed',
        query: { page: this.state.page }
      })
    })
  }

  __renderFeed (feeds, parentindex) {
    return feeds.map((item, index) => {
      const badges = item.badges || []
      const labels = item.labels || []

      return (
        <li key={`feed-${index}`}>
          <div className='product-list-wrapper'>
            <figure>
              <a aria-hidden='true' tabIndex='-1' href={item.url} className='relative'>
                <img src={item.image_url} className='' alt={`gambar ${item.name}`} />
              </a>
            </figure>
            <div className='product-list-desc'>
              <a aria-hidden='true' tabIndex='-1' href={item.url} className=''>
                <div className='product-list-name pl-5 u-truncate'> { item.name } </div>
              </a>
              <div className='product-list-price'> { item.price } </div>
              <div className='product-list-bedge pl-5'>
                {
                  labels.map((label, li) => {
                    let style = { backgroundColor: label['color'] }
                    if (label['color'] === '#ffffff') {
                      style = Object.assign(style, {
                        border: '1px solid #bbb',
                        color: '#606060'
                      })
                    }
                    return (
                      <span
                        className='feed__label'
                        key={`feed-${index}-label-${li}`}
                        style={style}>
                        { label['title'] }
                      </span>
                    )
                  })
                }
                {
                  labels.length === 0 &&
                  <span className='feed__label' style={{ backgroundColor: '#ffffff' }}>&nbsp;</span>
                }
              </div>
              <div className='clearfix' />
              <div className='product-list-shop'>
                <div>
                  <span className='ellipsis'>
                    <a href='#' className='feed__shop-name u-truncate'>{ item.shop.name }</a>
                  </span>
                </div>
                <div className='row-fluid'>
                  <span className='product-shop-location font-grey pull-left ellipsis'>
                    <i className='mi-icon mi-location' />
                    { item.shop.location }
                  </span>
                  <span className='product-shop-bedges pr-0 pull-right'>
                    {
                      badges.map((badge, bi) => {
                        return (
                          <img
                            alt={badge['title']}
                            title={badge['title']}
                            className='cursor-default inline-block va-middle space-badge'
                            key={`feed-${index}-badge-${bi}`}
                            src={badge['image_url']}
                            width='19'
                            height='19' />
                        )
                      })
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      )
    })
  }

  render () {
    const feeds = this.props.feeds || []
    const fd = this.props.get_feed || { has_next_page: false, items: [], total_data: 0 }
    const searchTransitionOptions = {
      transitionName: 'searchTransition',
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnter: true,
      transitionEnterTimeout: 500,
      transitionLeave: true,
      transitionLeaveTimeout: 500
    }

    return (
      <div className='u-clearfix feed-section'>
        <div className='row-fluid'>
          {
            feeds.length > 0 &&
              <TextHeader textType={2}>
                { this.props.title }
              </TextHeader>
          }
          <ul className='product-list-container pl-5 pr-5'>
            <ReactCSSTransitionGroup {...searchTransitionOptions}>
              {
                feeds.length > 0 && feeds.map((feed, index) => {
                  const key = `topads-cont-${index}`
                  if (feed['kind'] === 'feed') {
                    return ArrayHelper.chunk(feed['items'], 2).map((item, index) => {
                      const keys = `feed-cont-${index}`
                      return (
                        <div className='row-fluid' key={keys}>
                          { this.__renderFeed(item, index)}
                        </div>
                      )
                    })
                  } else if (feed['kind'] === 'topads') {
                    return (
                      <div className='row-fluid' key={key} >
                        <TopAdsIntegrate
                          dataAds={feed}
                          stateModal={this.state.modalState}
                          contentModal={MODAL_PARAMS.modalContent}
                          eventModal={this._eventModal}
                          eventShopClick={this._topAdsEvent}
                          />
                      </div>
                    )
                  }
                })
              }
            </ReactCSSTransitionGroup>
          </ul>
        </div>
        {
          fd['has_next_page'] &&
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
    page: state['feed'] ? state['feed'].page : state.page,
    query: state['feed'] ? state['feed'].query : state.query,
    feeds: state['feed'] ? state['feed'].feeds : state.feeds
  }
}

const mapDispatchToProps = {
  replaceFeeds, updatePage, updateQuery
}

const FeedWithData = graphql(queries.FeedQuery, {
  options: ({ ob, page, rows, userID, uniqueID, ep, src, item, q }) => ({
    variables: { ob, page, rows, userID, uniqueID, ep, src, item, q },
    forceFetch: true,
    returnPartialData: true
  }),
  props: ({ data: { loading, topads, get_feed, fetchMore } }) => {
    return {
      loading,
      get_feed,
      topads,
      fetchMore: (nextPage = 1) => {
        fetchMore({
          variables: { page: nextPage },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prev }
            const newFD = fetchMoreResult.data.get_feed
            const newTA = fetchMoreResult.data.topads
            return Object.assign({}, prev, {
              get_feed: Object.assign({}, prev.get_feed, {
                has_next_page: newFD['has_next_page'],
                total_data: newFD['total_data'],
                items: newFD.items
              }),
              topads: Object.assign({}, prev.topads, {
                display: newTA['display'],
                total_data: newTA['total_data'],
                items: newTA.items
              })
            })
          }
        })
      }
    }
  }
})(Feed)

export default connect(mapStateToProps, mapDispatchToProps)(FeedWithData)
