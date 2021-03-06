const TopedAceAPI = require('./../../api-consumer/api/Search/TopedAceAPI')
const api = new TopedAceAPI()

const EMPTY_SEARCH_RESULT = [
  {
    id: 'autocomplete',
    name: 'AUTOCOMPLETE',
    items: [
      {
        keyword: 'No Result Available',
        url: '/',
        imageURI: '',
        official: false,
        promoted: false,
        recom: ''
      }
    ]
  }
]

function universalSearch (userSearchID, query) {
  return api.universeSearch(query, userSearchID)
    .then(result => {
      const data = result['data'] || EMPTY_SEARCH_RESULT
      const finalResult = data.filter(r => { return r['items'].length > 0 }).map(r => {
        return {
          id: r['id'],
          name: r['name'],
          items: r['items'].map(i => {
            return {
              keyword: i['keyword'],
              url: i['url'],
              imageURI: i['imageURI'] || '',
              official: i['isOfficial'] || false,
              promoted: i['isPromoted'] || false,
              recom: i['recom'] || ''
            }
          })
        }
      })

      return finalResult
    })
    .catch(error => {
      console.error(`Error getting search result: ${error.message}`)

      return EMPTY_SEARCH_RESULT
    })
}

module.exports = universalSearch
