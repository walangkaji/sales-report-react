import HomeView from './components/HomeView'
import { HOSTNAME } from './../../constants'

// Sync route definition
export default (store, ApolloExecutors) => {
  return {
    component: HomeView,
    onEnter: (nextState, replace, callback) => {
      return ApolloExecutors.isUserLoggedIn()
        .then(isUserLoggedIn => {
          if (nextState.location.pathname === '/' &&
             !nextState.location.query.h &&
             isUserLoggedIn) {
            window.location = `${HOSTNAME}/?view=feed_preview`
          }

          return callback()
        })
        .catch(err => callback(err))
    }
  }
}
