// @flow
import i18n from 'react-native-i18n'

i18n.translations = {
  en: {
    score: 'score',
    comments: 'cmnt',
    empty_list_message: 'No content to show',
    close: 'Close'
  },
  es: {
    score: 'puntos',
    comments: 'cmnt',
    empty_list_message: 'No hay contenido para mostrar',
    close: 'Cerrar'
  },
  ca: {
    score: 'punts',
    comments: 'cmnt',
    empty_list_message: 'No hi ha contingut per mostrar',
    close: 'Tancar'
  },
  
}

export const getCountryCode = () => {
  let countryCode = 'en'

  try {
    let currentLocale = i18n.currentLocale()

    if (currentLocale && currentLocale.length > 0) {
      countryCode = currentLocale.slice(0, 1)
    }
  } finally {
    countryCode = 'en'
  }

  return countryCode
}

export const translate = (key: string) => i18n.t(key)
