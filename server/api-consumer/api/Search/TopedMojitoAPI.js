const obcache = require('obcache')
const TopedAPI = require('../TopedAPI')
const TopedHMACAPI = require('../TopedHMACAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const MOJITO_SERVICES = {
  Ticker: `${GlobalConfig.Mojito.Hostname}/api/v1/tickers`,
  Slides: `${GlobalConfig.Mojito.Hostname}/api/v1/slides`,
  Category: `${GlobalConfig.Mojito.Hostname}/api/v1/layout/category`,
  OfficialStores: `${GlobalConfig.Mojito.OfficialStoreHostname}/os/api/v1/brands/list?device=lite`,
  WishlistProducts: `${GlobalConfig.Mojito.Hostname}/v1.0.2/users/:user_id/wishlist/products?count=:count&page=:page`,
  WishlistModification: `${GlobalConfig.Mojito.Hostname}/v1/products/:product_id/wishlist`,
  WishlsitSearch: `${GlobalConfig.Mojito.Hostname}/users/:user_id/wishlist/search/v2?q=:query`
}

const MOJITO_HMAC_API_KEY = 'mojito_api_v1'

/**
 * A class that give us the ticker information in homepage.
 *
 * @class TopedMojitoAPI
 */
class TopedMojitoAPI {
  /**
   * Creates an instance of TopedMojitoAPI. *
   * @memberOf TopedMojitoAPI
   */
  constructor () {
    let api = new TopedAPI()

    this.api = api
    this.HMACApi = new TopedHMACAPI(MOJITO_HMAC_API_KEY)

    // get category
    let mojitoGetCategoryCache = obcache.debug.register(new obcache.Create(GlobalConfig.CacheOpts), 'mojitoGetCategory')
    this.getCategoryWrapped = mojitoGetCategoryCache.wrap(function getCategory (cb) {
      let url = URL.parse(MOJITO_SERVICES.Category)
      api.consume(url, 'GET', {}, {}, cb)
    })
  }

  getCategory () {
    return new Promise((resolve, reject) => {
      this.getCategoryWrapped((err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }

  /**
   * Get new tickers notification
   *
   * @param {string} userid The user_id. 0 if anonymous.
   * @param {number} pageSize How many tickers info you want in one page.
   * @param {string} deviceFilter What device is this info accessed from.
   * @param {string} action The Action.
   * @returns {Promise<Response>} The resulting response promise.
   *
   * @memberOf TopedMojitoAPI
   */
  getTickers (userid, pageSize, deviceFilter, action) {
    let content = {
      'page[size]': pageSize,
      'filter[device]': deviceFilter,
      'action': action
    }
    let url = URL.parse(MOJITO_SERVICES.Ticker)

    return this.api.consume(url, 'GET', content, {
      headers: { 'Tkpd-UserId': userid }
    })
  }

  /**
   * Get slides for frontpage
   *
   * @param {number} pageSize How many images you want to get for one page
   * @param {number} deviceFilter What device is these images accessed from.
   * @param {number} targetFilter Target devices
   * @param {number} stateFilter Target state
   * @param {number} expiredFilter Expired filter
   * @param {string} userid The user_id. 0 if anonymous.
   * @returns {Promise<Response>} The resulting response promise.
   *
   * @memberOf TopedMojitoAPI
   */
  getSlides (pageSize, deviceFilter, targetFilter, stateFilter, expiredFilter, userid) {
    let content = {
      'page[size]': pageSize,
      'filter[device]': deviceFilter,
      'filter[target]': targetFilter,
      'filter[state]': stateFilter,
      'filter[expired]': expiredFilter
    }
    let url = URL.parse(MOJITO_SERVICES.Slides)

    return this.api.consume(url, 'GET', content, {
      headers: { 'Tkpd-UserId': userid }
    })
  }

  getOfficialStores () {
    let url = URL.parse(MOJITO_SERVICES.OfficialStores)

    return this.api.consume(url, 'GET', {})
  }

  getWishlistProducts (userID, count = 10, page = 1) {
    const endpoint = MOJITO_SERVICES.WishlistProducts
                                    .replace(':user_id', userID)
                                    .replace(':count', count)
                                    .replace(':page', page)

    return this.api.consume(URL.parse(endpoint), 'GET', {})
  }

  filterWishlist (userID, query = '') {
    const endpoint = MOJITO_SERVICES.WishlsitSearch
                                    .replace(':user_id', userID)
                                    .replace(':query', query)

    return this.api.consume(URL.parse(endpoint), 'GET', {})
  }

  removeWishlist (userID, productID) {
    const endpoint = MOJITO_SERVICES.WishlistModification.replace(':product_id', productID)
    const content = {
      'user_id': userID,
      'product_id': productID,
      'bypass_hmac': 1,
      'bypass_hash': 1,
      'device_id': 'b'
    }
    const header = {
      'X-User-ID': userID,
      'X-Device': 'lite'
    }

    return this.HMACApi.consumeJSON(URL.parse(endpoint), 'DELETE', header, content)
                       .then(response => response.statusCode === 204)
                       .catch(err => {
                         console.error(`[Mojito][Wishlist][Delete] API call returning error: ${err}`)

                         return false
                       })
  }

  addWishlist (userID, productID) {
    const endpoint = MOJITO_SERVICES.WishlistModification.replace(':product_id', productID)
    const content = {
      'user_id': userID,
      'product_id': productID,
      'bypass_hmac': 1,
      'bypass_hash': 1,
      'device_id': 'b'
    }
    const header = {
      'X-User-ID': userID,
      'X-Device': 'lite'
    }

    return this.HMACApi.consumeJSON(URL.parse(endpoint), 'POST', header, content)
                       .then(response => response.statusCode === 201)
                       .catch(err => {
                         console.error(`[Mojito][Wishlist][Add] API call returning error: ${err}`)

                         return false
                       })
  }
}

module.exports = TopedMojitoAPI

if (require.main === module) {
  let api = new TopedMojitoAPI()
  api.getCategory()
    .then(result => console.log(JSON.stringify(result)))
    .catch(error => console.log(console.log(error)))
}
