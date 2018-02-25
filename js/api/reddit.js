// @flow
import { create } from 'apisauce'
import { Listing, ListingQueryParams, NewsShortDetail } from '../types/Reddit'

module.exports = (baseURL = 'https://api.reddit.com') => {
  const api = create({ baseURL })

  if (__DEV__) {
    api.addMonitor(console.log)
  }

  const listPics = async (params: ListingQueryParams = {}): Listing<NewsShortDetail> => {
    let response = await api.get('/r/pics/new.json', params)

    if (!response.ok) {
      let error = new Error(`Unexpected api result ${response.status}`)
      error.response = response
      throw error;
    }

    return (response.data || {}).data || {}
  }

  return {
    listPics
  }
}
