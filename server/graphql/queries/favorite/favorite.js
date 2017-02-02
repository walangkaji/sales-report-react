const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { Favorites } = require('../../types/favorite')
const { getPromoted, getFavorited, getCSRF } = require('../../models/favorite')

const FavoritedQuery = {
  type: Favorites,
  args: {
    user_id: { type: GraphQLInt },
    query: { type: GraphQLString },
    page: { type: GraphQLInt },
    count: { type: GraphQLInt },
    shop: { type: GraphQLString }
  },
  resolve: function (_, args, context) {
    console.log("=======================================")
    console.log(getCSRF(context))
    console.log("=======================================")
    return getFavorited(args.user_id, args.count, args.page, args.shop)
  }
}

module.exports = {
  favorite: FavoritedQuery 
}
