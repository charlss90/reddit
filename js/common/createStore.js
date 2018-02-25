import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducers from '../reducers'

module.exports = () => {
  var store = compose(applyMiddleware(thunk, logger))(createStore)(reducers)
  return store
}
