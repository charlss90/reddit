// @flow
import reddit from '../api/reddit'

let api = reddit()

export const listPics = () => async (dispatch: () => void, getState: () => object) => {
  let isListingSuccessfully = false
  try {
    let newsState = (getState() || {}).news || {}

    if (isValidToList(newsState)) {
      dispatch({ type: 'NEWS_GET' })
      let payload = await api.listPics({ after: newsState.nextPage })

      await dispatch({
        type: 'NEWS_GET_SUCCESS',
        payload: {
          ...payload,
          children: (payload.children || [])
            .filter(x => x && x.data && x.data.id)
            .map(x => ({
              ...(x.data || {}),
              key: (x.data || {}).id
            }))
        }
      })
      isListingSuccessfully = true
    }
  } catch (error) {
    await dispatch({ type: 'NEWS_GET_ERROR', error })
  }

  return isListingSuccessfully
}

function isValidToList(newsState) {
  return ((newsState.listing || []).length == 0 && !newsState.nextPage)
    || newsState.nextPage
}

