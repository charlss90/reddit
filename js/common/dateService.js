//@flow
import moment from 'moment'
import { getCountryCode } from './localeService'
import 'moment/locale/es'

const ACCEPT_LENGUAGES = ['en', 'es']
try {
  let countryCode = getCountryCode()
  console.log(countryCode)
  if (~ACCEPT_LENGUAGES.indexOf(countryCode)) {
    moment.locale(countryCode)
  }
} catch (ex) {
  if (__DEV__) {
    console.error(ex)
  }
}

export const dateFromNow = (date: number) => {
  let fromNow

  try {
    if (date && `${date}`.length === 10) {
      date = date * 1000
    }
    fromNow = moment(date).fromNow()
  } catch (ex) {
    if (__DEV__) {
      console.error(ex)
    }
  }
  return fromNow
}
