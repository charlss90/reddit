// @flow
import { Listing, NewsShortDetail } from './Reddit'

export type NewAction = {
  type: 'NEWS_GET' | 'NEWS_GET_SUCCESS' | 'NEWS_GET_ERROR',
  payload: Listing<NewsShortDetail>,
  error?: Error
}
