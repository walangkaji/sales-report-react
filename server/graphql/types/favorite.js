const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = require('graphql')

const Products = new GraphQLObjectType({
  name: 'Products',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    img_url: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const Favorite = new GraphQLObjectType({
  name: 'Favorite',
  fields: {
    shop_id: { type: new GraphQLNonNull(GraphQLID) },
    shop_url: { type: GraphQLString },
    domain: { type: new GraphQLNonNull(GraphQLString) },
    shop_name: { type: new GraphQLNonNull(GraphQLString) },
    shop_pic: { type: new GraphQLNonNull(GraphQLString) },
    is_gold: { type: new GraphQLNonNull(GraphQLString) },
    is_official: { type: new GraphQLNonNull(GraphQLString) },
    is_active: { type: new GraphQLNonNull(GraphQLBoolean) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    products: { type: new GraphQLList(Products) }
  }
})
const Favorites = new GraphQLList(Favorite)

module.exports = { Favorites, Favorite, Products }