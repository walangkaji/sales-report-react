const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')
const api = new TopedMojitoAPI()

function getMainPageCategories () {
  return api.getCategory()
    .then(response => {
      if (!response || !response['data']) {
        return []
      }

      return {
        categories: response['data']['layout_sections'].map(section => {
          return {
            name: section['title'],
            items: section['layout_rows'].map(row => {
              const id = row['url'].split('/')

              return {
                name: row['name'],
                identifier: id[id.length - 1],
                imageURI: row['image_url'],
                url: row['url'].replace('www', 'm')
              }
            })
          }
        }),
        errors: []
      }
    })
    .catch(error => {
      return {
        categories: [],
        errors: [error.name, error.message]
      }
    })
}

module.exports = {
  getMainPageCategories: getMainPageCategories
}
