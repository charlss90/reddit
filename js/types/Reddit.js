// @flow

export type ListingQueryParams = {
  before?: string,
  after?: string
}

export type NewView = {
  thumbnail: string,
  date: string,
  title: string,
  author: string,
  score: number,
  comments: number
}

export type NewsShortDetail = {
  thumbnail: string,
  created_utc: string,
  title: string,
  author: string,
  score: number,
  num_comments: number,
  url: string
}

export type Thing<T> = {
  id: string,
  name: string,
  kind: string,
  data: T
}

export type Listing<T> = {
  before?: string,
  after?: string,
  modhash: string,
  children: Array<Thing<T>>
}

