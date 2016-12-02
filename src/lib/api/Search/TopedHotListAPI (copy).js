import TopedHMACAPI from 'lib/api/TopedHMACAPI'
import config from 'lib/api/config'

/**
 * Class that consumes APIs related to HotList.
 *
 * @class TopedHotListAPI
 */
class TopedHotListAPI {
    /**
     * @static List of URLs available for this API
     *
     * TODO: Configure webpack to supply the hostname directly
     * @memberOf TopedHotListAPI
     */
  static URL = {
    HotList: `https://${config.WS.Hostname}/v4/hotlist/get_hotlist.pl`
  }

    /**
     * Creates an instance of TopedHotListAPI.
     *
     * @param {string} apiKey the API Key for TokopediaHotList API
     *
     * @memberOf TopedHotListAPI
     */
  constructor (apiKey) {
    this.api = new TopedHMACAPI(apiKey)
  }

    /**
     * Get product hot list.
     *
     * @param {number} page The page number of the data we want to show.
     * @param {number} perPage How much data per page we want to show.
     * @param {string} query Filter query for the data we want to show.
     * @returns {Promise<Object>} A promise of object returned from the API.
     *
     * @memberOf TopedHotListAPI
     */
  getHotList (page, perPage, query) {
    const url = TopedHotListAPI.URL.HotList
    const content = {
      'page': page,
      'per_page': perPage,
      'query': query,
      'bypass_hmac': 1,
      'bypass_hash': 1,
      'device_id': 'b'
    }

    return this.api.consume('FORM', new URL(url), 'POST', content).then(response => {
      return response.json()
    })
  }
}

export default TopedHotListAPI