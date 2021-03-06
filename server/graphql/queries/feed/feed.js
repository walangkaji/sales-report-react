const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { FeedsType } = require('../../types/feed/feed')
const { RecommendationsType } = require('../../types/recommendation/recommendation')
const { RecentViewsType } = require('../../types/recent-view/recent-view')
const { getFeeds, getRecommendations, getRecentViews } = require('../../models/feed')

const userFeedQuery = {
  type: FeedsType,
  args: {
    ob: { type: GraphQLInt },
    rows: { type: GraphQLInt },
    page: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    uniqueID: { type: GraphQLString }
  },
  resolve: function (_, args) {
    return getFeeds(args.ob, args.rows, args.page, args.userID, args.uniqueID)
  }
}

const userRecommendationQuery = {
  type: RecommendationsType,
  args: {
    userID: { type: GraphQLInt },
    recommendationSource: { type: GraphQLString },
    recommendationSize: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return getRecommendations(args.userID, args.recommendationSource, args.recommendationSize)
  }
}

const userRecentViewQuery = {
  type: RecentViewsType,
  args: {
    userID: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return getRecentViews(args.userID)
  }
}

module.exports = {
  'get_feed': { 'get_feed': userFeedQuery },
  'get_recommendation': { 'get_recommendation': userRecommendationQuery },
  'get_recent_view': { 'get_recent_view': userRecentViewQuery }
}
