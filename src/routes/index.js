// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import HotListRoute from './HotList'
import CategoryRoute from './Category'
import WishlistRoute from './WishList'
import DigitalRoute from './Digital'
import FeedRoute from './Feed'
import NotFound from './NotFound'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store, ApolloExecutors) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store, ApolloExecutors),
  childRoutes: [
    HotListRoute(store),
    CategoryRoute(store),
    WishlistRoute(store, ApolloExecutors),
    DigitalRoute(store),
    FeedRoute(store, ApolloExecutors),
    {
      path: '*',
      component: NotFound
    }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
