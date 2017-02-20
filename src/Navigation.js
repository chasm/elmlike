import Future from 'fluture'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

export const changeLocation = (action, url) => () => {
  history.push(url)

  return Future.of(url).map(action)
}

export const getLocation = () => history.location.pathname

export default {
  changeLocation,
  getLocation,
}
