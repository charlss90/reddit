// @flow
import { NewsShortDetail } from '../types/Reddit'
import { NewAction } from '../types/News'

type State = {
  nextPage?: string,
  fetching: boolean,
  listing: Array<NewsShortDetail>,
  error?: Error
}

const initialState = {
  fetching: false,
  nextPage: null,
  listing: [],
  error: null
}

module.exports = (state: State = initialState, action: NewAction) => {
  switch (action.type) {
    case 'NEWS_GET':
      return {
        ...state,
        fetching: true
      }
    case 'NEWS_GET_SUCCESS':
      var payload = action.payload || {}
      var listing = state.listing || []
      var nextPage = payload.after
      listing.push(...payload.children)
      // reduce for duplicates
      listing = listing.reduce(
        (x, y) =>
          x.filter(j => j.id === y.id).length > 0 ? x : [...x, y],
        []
      )

      return {
        ...state,
        nextPage,
        listing,
        fetching: false
      }
    case 'NEWS_GET_ERROR':
      var error = action.error || { message: 'Unexpected error' }

      return {
        ...state,
        error,
        fetching: false
      }
    default:
      return state
  }
}
